import { buildSchema, cloneDeep, SchemaRegistry } from '@sprucelabs/schema'
import { timezoneChoices } from '@sprucelabs/spruce-core-schemas'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { endOfDay, startOfDay } from 'date-fns'
import { getTimezoneOffset, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { generateId } from '../../generateId'
import DateUtilDecorator from '../../locales/DateUtilDecorator'
import LocaleImpl from '../../locales/Locale'
import TimezoneChoiceSorter from '../../locales/TimezoneChoiceSorter'
import {
	DateUtil,
	RepeatingCalendarEvent,
	TimezoneName,
} from '../../types/calendar.types'
import calendarUtil from '../../utilities/calendar.utility'
import dateUtil, { IDate } from '../../utilities/date.utility'
import sortTimezoneChoices from '../../utilities/sortTimezoneChoices'

export default class WorkingWithTimezonesTest extends AbstractSpruceTest {
	private static locale: SpyLocale
	private static dates: DateUtil = dateUtil as DateUtil
	private static decorator: DateUtilDecorator

	private static readonly nov4th202312pmLa = 1699124400000
	private static readonly nov5th202312pmLa = 1699214400000

	protected static async beforeEach() {
		SchemaRegistry.getInstance().forgetAllSchemas()
		await super.beforeEach()
		this.locale = new SpyLocale()
		this.decorator = new DateUtilDecorator(this.locale)
		this.dates = this.decorator.makeLocaleAware(dateUtil)
	}

	@test()
	protected static throwsWhenMissingOffset() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.locale.setTimezoneOffsetMinutes())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['offset'],
		})
	}

	@test()
	protected static async setsAndGetsAsExpected() {
		this.test(0)
		this.test(10)
		this.test(40)
		this.test(100)
	}

	@test()
	protected static async startsAtBrowsersTimezone() {
		this.assertOffset(new Date().getTimezoneOffset() * -1)
		new Date().toLocaleTimeString()
	}

	@test()
	protected static async dateUtilDecoratorThrowsWithMissing() {
		//@ts-ignore
		const err = assert.doesThrow(() => new DateUtilDecorator())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['locale'],
		})
	}

	@test()
	protected static async decoratingFailsWhenMissing() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.decorator.makeLocaleAware())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['dateUtil'],
		})
	}

	@test()
	protected static throwsWithBadZone() {
		const name = generateId()
		const err = assert.doesThrow(() =>
			this.zoneNameToOffsetMinutes(name as any)
		)
		errorAssert.assertError(err, 'INVALID_TIMEZONE_NAME', {
			name,
		})
	}

	@test()
	protected static doesntThrowWithValidZoneName() {
		this.zoneNameToOffsetMinutes('America/Denver')
		this.zoneNameToOffsetMinutes('Africa/Cairo')
	}

	@test()
	protected static getsExpected() {
		this.assertZoneNameToOffsetEqualsExpected('Africa/Cairo')
		this.assertZoneNameToOffsetEqualsExpected('Africa/Casablanca')
	}

	@test()
	protected static async canSetZone() {
		await this.assertSetsZoneName('Africa/Cairo')
		await this.assertSetsZoneName('America/Caracas')
	}

	@test('expected zone based on offset 1', 0)
	@test('expected zone based on offset 2', -420)
	@test('expected zone based on offset 3', -240)
	protected static matchesFirstZoneNameBasedOnOffset(offset: number) {
		const sorter = new TimezoneChoiceSorter(this.locale)

		const expected =
			offset === 0
				? 'UTC'
				: sorter
						.sort(timezoneChoices as any)
						.map((t) => t.value)
						.find((name) => {
							const o = this.locale.zoneNameToOffsetMinutes(name as any)
							return o === offset
						})

		const name = this.locale.offsetMinutesToZoneName(offset)

		assert.isEqual(name, expected)
	}

	@test()
	protected static async findsOffsetForAllTimezones() {
		timezoneChoices.forEach(({ value }) =>
			this.locale.zoneNameToOffsetMinutes(value)
		)
	}

	@test()
	protected static async usesLocaleOffsetToGetFirstZoneName() {
		this.assertUsesLocaleToLoadDefaultZoneName(0, ['UTC'])
		this.assertUsesLocaleToLoadDefaultZoneName(-360, [
			'America/Bahia_Banderas', // Oct 30th 2am -> April 2nd 2am
			'America/Denver',
			'America/Belize',
		])
	}

	@test()
	protected static async updatingZoneNameUpdatesOffset() {
		await this.assertSettingZoneNameUpdatesOffset('Africa/Windhoek', 120)
		await this.assertSettingZoneNameUpdatesOffset('UTC', 0)
		await this.assertSettingZoneNameUpdatesOffset('Europe/Minsk', 180)
	}

	@test()
	protected static async formatTimeHonorsZoneName() {
		await this.assertNewDateHonorsLocale('America/Denver', {}, 1641056400000)
		await this.assertNewDateHonorsLocale(
			'America/Denver',
			{ year: 2023 },
			1672592400000
		)
	}

	@test('format time honors local', 'America/Denver', '3am')
	@test('format time honors local', 'Europe/Minsk', '1pm')
	@test('format time honors local', 'Africa/Windhoek', '12pm')
	protected static async formatTimeHonorsLocal(
		zone: TimezoneName,
		expected: string
	) {
		const currentDate = new Date()

		const date = dateUtil.date({
			year: currentDate.getFullYear(),
			month: 0,
			day: 1,
			hour: 10,
			minute: 0,
			second: 0,
		})

		await this.setZone(zone)
		const actualTime = this.dates.formatTime(date)
		assert.isEqual(actualTime, expected)

		const actualDateTime = this.dates.formatDateTime(date)
		assert.isEqual(actualDateTime, 'Jan 1st @ ' + expected)
	}

	@test()
	@test('set time honors local', 'America/Denver')
	@test('set time honors local', 'Europe/Minsk')
	@test('set time honors local', 'Africa/Windhoek')
	protected static async settingTimeOfDayHonorsLocale(zone: TimezoneName) {
		const date = dateUtil.date({
			year: 2022,
			month: 0,
			day: 1,
			hour: 0,
			minute: 0,
			second: 0,
		})

		await this.setZone(zone)

		const actual = this.dates.setTimeOfDay(date, 3)
		const formatted = this.dates.formatTime(actual)

		assert.isEqual(formatted, '3am')
	}

	@test()
	protected static async formatDateTimeHonorsLocale() {
		const date = dateUtil.date({
			year: 2022,
			month: 0,
			day: 1,
			hour: 2,
			minute: 0,
			second: 0,
		})

		await this.setZone('America/Denver')
		const actualTime = this.dates.formatDateTime(date)
		assert.isEqual(actualTime, 'Dec 31st, 2021 @ 7pm')
	}

	@test('setting zone emits event 1', 'Africa/Casablanca')
	@test('setting zone emits event 2', 'Africa/Cairo')
	protected static async settingZoneEmitsEvent(zoneName: TimezoneName) {
		let wasHit = false
		let passedZone: string | undefined | null

		await this.locale.on('did-change-timezones', ({ zoneName }) => {
			wasHit = true
			passedZone = zoneName
		})

		await this.setZone(zoneName)

		assert.isTrue(wasHit)
		assert.isEqual(passedZone, zoneName)
	}

	@test()
	protected static async doesNotFireChangeTimezonesWhenSettingToSame() {
		let hitCount = 0
		await this.locale.on('did-change-timezones', () => {
			hitCount++
		})

		await this.setZone('Africa/Abidjan')
		assert.isEqual(hitCount, 1)
		await this.setZone('Africa/Abidjan')
		assert.isEqual(hitCount, 1)
	}

	@test('start of day honors locale America/Denver', 'America/Denver')
	@test('start of day honors locale America/Los_Angeles', 'America/Los_Angeles')
	@test('start of day honors locale America/Belize', 'America/Belize')
	protected static async startOfDayHonorsLocale(zone: TimezoneName) {
		await this.setZone(zone)

		const actual = this.dates.getStartOfDay()

		const expected = this.getExpectedStartOfDay(zone)

		assert.isEqual(actual, expected)
	}

	@test('end of day honors locale America/Denver', 'America/Denver', -7)
	@test('end of day honors locale America/Belize', 'America/Belize', -6)
	protected static async endOfDayHonorsLocale(zone: TimezoneName) {
		await this.setZone(zone)
		const actual = this.dates.getEndOfDay()
		const expected = this.getExpectedEndOfDay(zone)
		assert.isEqual(actual, expected)
	}

	private static getExpectedEndOfDay(
		timezone: string,
		timestamp?: number
	): number {
		// Use the passed timestamp or the current time
		const referenceTime = timestamp != null ? new Date(timestamp) : new Date()

		// Convert the reference time to the specified timezone
		const zonedTime = utcToZonedTime(referenceTime, timezone)

		// Get the end of the day in the specified timezone
		const endOfZonedDay = endOfDay(zonedTime)

		// Convert the end of the zoned day back to UTC
		const endOfUtcDay = zonedTimeToUtc(endOfZonedDay, timezone)

		// Return the time in milliseconds since the Unix Epoch
		return endOfUtcDay.getTime()
	}

	@test(
		'start of month honors locale America/Denver',
		1672552800000,
		1669878000000,
		'America/Denver'
	)
	@test(
		'start of month honors locale America/Belize',
		1674370800000,
		1672552800000,
		'America/Belize'
	)
	protected static async startOfMonthHonorsLocale(
		now: number,
		expected: number,
		zone: TimezoneName
	) {
		await this.setZone(zone)

		const actual = this.dates.getStartOfMonth(now)

		assert.isEqual(actual, expected)
	}

	@test(
		'end of month honors locale America/Denver',
		1610737924928,
		1612162799999,
		'America/Denver'
	)
	@test(
		'end of month honors locale America/Belize',
		1610737924928,
		1612159199999,
		'America/Belize'
	)
	protected static async endOfMonthHonorsLocale(
		now: number,
		expected: number,
		zone: TimezoneName
	) {
		await this.setZone(zone)
		const actual = this.dates.getEndOfMonth(now)
		assert.isEqual(actual, expected)
	}

	@test()
	protected static async splitDateHonorsLocale() {
		const jan222023 = 1674419514883

		const zone1 = 'America/Denver'
		const zone2 = 'Pacific/Wake'

		const split1 = await this.setZoneAndSplit(zone1, jan222023)
		const split2 = await this.setZoneAndSplit(zone2, jan222023)

		assert.isEqualDeep(split1, {
			year: 2023,
			month: 0,
			day: 22,
			hour: 13,
			minute: 31,
		})

		assert.isEqualDeep(split2, {
			year: 2023,
			month: 0,
			day: 23,
			hour: 8,
			minute: 31,
		})
	}

	@test()
	protected static async dateHonorsDaylightSavingsTimeInDenver() {
		await this.setZone('America/Denver')
		const expected = 1699167600000
		const actual = this.dates.date({
			year: 2023,
			month: 10,
			day: 5,
		})

		assert.isEqual(actual, expected)
	}

	@test('can sort timezones on schema with utility 1', 'timezone')
	@test('can sort timezones on schema with utility 2', 'location')
	protected static async sorterUtilityFunctionUpdatesSchema(fieldName: string) {
		const schema = this.buildSchemaWithTimezoneFieldNamed(fieldName)

		const sorter = new TimezoneChoiceSorter(this.locale)
		const choices = sorter.sort(timezoneChoices)

		const expected = cloneDeep(schema)

		//@ts-ignore
		expected.fields[fieldName].options.choices = choices

		const actual = sortTimezoneChoices(this.locale, schema, fieldName)
		assert.isEqualDeep(actual, expected)
	}

	@test()
	protected static async sorterUtilityDoesNotMutateOriginalSchema() {
		const schema = this.buildSchemaWithTimezoneFieldNamed()
		sortTimezoneChoices(this.locale, schema, 'timezone')
		assert.isEqualDeep(schema.fields.timezone.options.choices, [])
	}

	@test()
	protected static async doesNotCrashIfSChemaIsMissingOptions() {
		const schema = this.buildSchemaWithTimezoneFieldNamed()
		//@ts-ignore
		delete schema.fields.timezone.options
		sortTimezoneChoices(this.locale, schema, 'timezone')
	}

	@test()
	protected static async getZoneNameOnlyDoesLookupOnce() {
		await this.locale.setZoneName('UTC')
		this.locale.clearCurrentZone()
		const count = this.getZoneNameAndHitCount()
		this.getZoneAndAssertHits(count)
		this.getZoneAndAssertHits(count)
		this.locale.setTimezoneOffsetMinutes(60)
		const count2 = this.getZoneNameAndHitCount()
		assert.isNotEqual(count, count2)
		this.getZoneAndAssertHits(count2)
		this.getZoneAndAssertHits(count2)
		this.locale.setTimezoneOffsetMinutes(60)
		this.getZoneAndAssertHits(count2)
	}

	@test()
	protected static async getTimezoneOffsetMinutesCachesByTheHour() {
		await this.locale.setZoneName('UTC')
		const date = this.dates.date()
		const tenAm = this.dates.setTimeOfDay(date, 10, 0, 0, 0)
		const tenFifteen = this.dates.setTimeOfDay(date, 10, 15, 0, 0)
		const tenThirty = this.dates.setTimeOfDay(date, 10, 30, 0, 0)
		const tenFourtyFive = this.dates.setTimeOfDay(date, 10, 45, 0, 0)

		this.locale.zoneNameToOffsetMinutesCount = 0
		this.locale.clearCache()

		this.getTimezoneOffsetAndAssertHitCount(tenAm, 1)
		this.getTimezoneOffsetAndAssertHitCount(tenAm, 1)

		this.getTimezoneOffsetAndAssertHitCount(tenFifteen, 1)

		this.getTimezoneOffsetAndAssertHitCount(tenThirty, 1)
		this.getTimezoneOffsetAndAssertHitCount(tenFourtyFive, 1)
	}

	@test()
	protected static async getZoneNameCachesAfterFirstLookup() {
		this.locale.offsetMinutesToZoneName = () => 'Africa/Abidjan'
		this.getZoneName()
		assert.isEqual(this.locale.currentZone, 'Africa/Abidjan')
	}

	@test()
	protected static async canGetDateInLosAngelesAcrossDst() {
		await this.locale.setZoneName('America/Los_Angeles')

		const beforeDst = this.dates.date({
			year: 2023,
			month: 10,
			day: 4,
			hour: 12,
		})

		assert.isEqual(beforeDst, this.nov4th202312pmLa)

		const afterDst = this.dates.date({
			year: 2023,
			month: 10,
			day: 5,
			hour: 12,
		})

		assert.isEqual(afterDst, this.nov5th202312pmLa)
	}

	@test()
	protected static async honorsDstInLosAngelesWhenGeneratingRepeating() {
		const event: RepeatingCalendarEvent = {
			startDateTimeMs: this.nov4th202312pmLa,
			repeats: 'daily',
			occurrences: 2,
			timeBlocks: [{ title: 'Session', isBusy: true, durationMinutes: 120 }],
		}

		const [e1, e2] = calendarUtil.applyRuleAndGetEvents(
			event,
			this.dates.date({
				year: 2024,
				month: 0,
				day: 1,
			}),
			'America/Los_Angeles'
		)

		assert.isEqual(
			e1.startDateTimeMs,
			this.nov4th202312pmLa,
			`e1 not match expected ${e1.startDateTimeMs} != ${this.nov4th202312pmLa}`
		)
		assert.isEqual(
			e2.startDateTimeMs,
			this.nov5th202312pmLa,
			`e2 not match expected ${e2.startDateTimeMs} != ${this.nov5th202312pmLa}`
		)
	}

	@test()
	protected static async passingTimezoneToGetTimezoneOffsetDoesNotCache() {
		const now = Date.now()
		const offset1 = this.locale.getTimezoneOffsetMinutes(
			now,
			'Europe/Amsterdam'
		)
		const offset2 = this.locale.getTimezoneOffsetMinutes(
			now,
			'America/Los_Angeles'
		)
		assert.isNotEqual(offset1, offset2)
	}

	@test()
	protected static async getTimezoneOffsetWorksWithTimezoneAndNoDate() {
		const now = Date.now()
		const offset1 = this.locale.getTimezoneOffsetMinutes(
			now,
			'Europe/Amsterdam'
		)

		const offset2 = this.locale.getTimezoneOffsetMinutes(
			undefined,
			'Europe/Amsterdam'
		)

		assert.isEqual(offset1, offset2)
	}

	@test()
	protected static async canAddMonthsProperly() {
		const start = 1698818400000
		await this.locale.setZoneName('America/Denver')
		const actual = this.dates.addMonths(start, 1)
		assert.isEqual(actual, 1701414000000)
	}

	private static getTimezoneOffsetAndAssertHitCount(
		forDate: number,
		expected: number
	) {
		this.locale.getTimezoneOffsetMinutes(forDate)
		this.assertOffsetMinutesToZoneHitCount(expected)
	}

	private static getZoneNameAndHitCount() {
		this.getZoneName()
		const count = this.locale.zoneNameToOffsetMinutesCount
		return count
	}

	private static getZoneAndAssertHits(expected: number) {
		this.getZoneName()
		this.assertOffsetMinutesToZoneHitCount(expected)
	}

	private static assertOffsetMinutesToZoneHitCount(expected: number) {
		assert.isEqual(this.locale.zoneNameToOffsetMinutesCount, expected)
	}

	private static buildSchemaWithTimezoneFieldNamed(fieldName = 'timezone') {
		return buildSchema({
			id: 'withTimezone',
			fields: {
				[fieldName]: {
					type: 'select',
					options: {
						choices: [],
					},
				},
			},
		})
	}

	private static async setZoneAndSplit(zone: TimezoneName, date: number) {
		await this.setZone(zone)
		return this.dates.splitDate(date)
	}

	private static async assertNewDateHonorsLocale(
		zone: TimezoneName,
		d: Partial<IDate>,
		expected: number
	) {
		await this.setZone(zone)
		const results = this.dates.date({
			year: 2022,
			month: 0,
			day: 1,
			hour: 10,
			minute: 0,
			second: 0,
			...d,
		})
		assert.isEqual(results, expected)
	}

	private static getExpectedStartOfDay(
		timezone: TimezoneName,
		timestamp?: number
	) {
		const referenceTime = timestamp != null ? new Date(timestamp) : new Date()
		const zonedTime = utcToZonedTime(referenceTime, timezone)
		const startOfZonedDay = startOfDay(zonedTime)
		const startOfUtcDay = zonedTimeToUtc(startOfZonedDay, timezone)
		return startOfUtcDay.getTime()
	}

	private static assertUsesLocaleToLoadDefaultZoneName(
		offset: number,
		possibleZones: TimezoneName[]
	) {
		this.locale.setTimezoneOffsetMinutes(offset)
		const a = this.getZoneName()
		assert.isAbove(possibleZones.indexOf(a as any), -1)
	}

	private static async assertSetsZoneName(name: TimezoneName) {
		await this.setZone(name)
		this.assertZoneName(name)
	}

	private static assertZoneName(name: TimezoneName) {
		assert.isEqual(this.getZoneName(), name)
	}

	private static getZoneName(): string {
		return this.locale.getZoneName()
	}

	private static assertZoneNameToOffsetEqualsExpected(name: TimezoneName) {
		const expected = getTimezoneOffset(name) / 1000 / 60
		const actual = this.zoneNameToOffsetMinutes(name)
		assert.isEqual(expected, actual)
	}

	private static zoneNameToOffsetMinutes(name: TimezoneName): any {
		return this.locale.zoneNameToOffsetMinutes(name)
	}

	private static test(offset: number) {
		this.setOffset(offset)
		this.assertOffset(offset)
	}

	private static assertOffset(expected: number) {
		assert.isEqual(this.locale.getTimezoneOffsetMinutes(), expected)
	}

	private static setOffset(offset: number) {
		this.locale.setTimezoneOffsetMinutes(offset)
	}

	private static async assertSettingZoneNameUpdatesOffset(
		name: TimezoneName,
		expected: number
	) {
		await this.setZone(name)
		this.assertOffset(expected)
	}

	private static async setZone(zone: TimezoneName) {
		await this.locale.setZoneName(zone)
	}
}

class SpyLocale extends LocaleImpl {
	public currentZone?: TimezoneName
	public zoneNameToOffsetMinutesCount = 0
	public clearCurrentZone() {
		this.currentZone = undefined
	}

	public clearCache() {
		this.offsetsForDate = {}
	}

	public zoneNameToOffsetMinutes(name: TimezoneName, onDate?: number) {
		this.zoneNameToOffsetMinutesCount++
		return super.zoneNameToOffsetMinutes(name, onDate)
	}
}

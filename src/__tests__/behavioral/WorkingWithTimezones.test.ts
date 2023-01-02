import { timezoneChoices } from '@sprucelabs/spruce-core-schemas'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { getTimezoneOffset } from 'date-fns-tz'
import { generateId } from '../../generateId'
import DateUtilDecorator from '../../locales/DateUtilDecorator'
import LocaleImpl from '../../locales/Locale'
import TimezoneChoiceSorter from '../../locales/TimezoneChoiceSorter'
import { DateUtils, TimezoneName } from '../../types/calendar.types'
import dateUtil, { IDate } from '../../utilities/date.utility'

export default class WorkingWithTimezonesTest extends AbstractSpruceTest {
	private static locale: LocaleImpl
	private static dates: DateUtils = dateUtil as any
	private static decorator: DateUtilDecorator

	protected static async beforeEach() {
		await super.beforeEach()
		this.locale = new LocaleImpl()
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
		const err = assert.doesThrow(() => this.zoneNameToOffset(name as any))
		errorAssert.assertError(err, 'INVALID_TIMEZONE_NAME', {
			name,
		})
	}

	@test()
	protected static doesntThrowWithValidZoneName() {
		this.zoneNameToOffset('America/Denver')
		this.zoneNameToOffset('Africa/Cairo')
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

	@test()
	protected static async newDatesMoveToUtc() {
		Date.prototype.getTimezoneOffset = () => {
			return -360
		}

		const date = new Date()
		const zone = 'Africa/Casablanca'
		const offset = this.zoneNameToOffset(zone) * 60 * 1000
		const expected =
			date.getTime() - date.getTimezoneOffset() * 60 * 1000 - offset

		await this.setZone(zone)
		const actual = this.dates.date()

		assert.isAbove(actual, expected - 10)
		assert.isBelow(actual, expected + 10)
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
		const actual = this.zoneNameToOffset(name)
		assert.isEqual(expected, actual)
	}

	private static zoneNameToOffset(name: TimezoneName): any {
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

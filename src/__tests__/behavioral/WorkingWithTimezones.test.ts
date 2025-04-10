import { buildSchema, cloneDeep, SchemaRegistry } from '@sprucelabs/schema'
import { timezoneChoices } from '@sprucelabs/spruce-core-schemas'
import AbstractSpruceTest, { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { endOfDay, endOfWeek, startOfDay, startOfWeek } from 'date-fns'
import { getTimezoneOffset, toZonedTime, fromZonedTime } from 'date-fns-tz'
import { generateId } from '../../generateId'
import DateUtilDecorator from '../../locales/DateUtilDecorator'
import TimezoneChoiceSorter from '../../locales/TimezoneChoiceSorter'
import {
    DateUtil,
    RepeatingCalendarEvent,
    TimezoneName,
} from '../../types/calendar.types'
import calendarUtil from '../../utilities/calendar.utility'
import dateUtil, { IDate } from '../../utilities/date.utility'
import sortTimezoneChoices from '../../utilities/sortTimezoneChoices'
import SpyLocale from './SpyLocale'

@suite()
export default class WorkingWithTimezonesTest extends AbstractSpruceTest {
    private locale!: SpyLocale
    private dates: DateUtil = dateUtil as DateUtil
    private decorator!: DateUtilDecorator

    private readonly nov4th202312pmLa = 1699124400000
    private readonly nov5th202312pmLa = 1699214400000

    protected async beforeEach() {
        SchemaRegistry.getInstance().forgetAllSchemas()
        await super.beforeEach()
        this.locale = new SpyLocale()
        this.decorator = new DateUtilDecorator(this.locale)
        this.dates = this.decorator.makeLocaleAware(dateUtil)
    }

    @test()
    protected throwsWhenMissingOffset() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            this.locale.setTimezoneOffsetMinutes()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['offset'],
        })
    }

    @test()
    protected async setsAndGetsAsExpected() {
        this.test(0)
        this.test(10)
        this.test(40)
        this.test(100)
    }

    @test()
    protected async startsAtBrowsersTimezone() {
        this.assertOffset(new Date().getTimezoneOffset() * -1)
        new Date().toLocaleTimeString()
    }

    @test()
    protected async dateUtilDecoratorThrowsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => new DateUtilDecorator())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['locale'],
        })
    }

    @test()
    protected async decoratingFailsWhenMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.decorator.makeLocaleAware())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['dateUtil'],
        })
    }

    @test()
    protected throwsWithBadZone() {
        const name = generateId()
        const err = assert.doesThrow(() =>
            this.zoneNameToOffsetMinutes(name as any)
        )
        errorAssert.assertError(err, 'INVALID_TIMEZONE_NAME', {
            name,
        })
    }

    @test()
    protected doesntThrowWithValidZoneName() {
        this.zoneNameToOffsetMinutes('America/Denver')
        this.zoneNameToOffsetMinutes('Africa/Cairo')
    }

    @test()
    protected getsExpected() {
        this.assertZoneNameToOffsetEqualsExpected('Africa/Cairo')
        this.assertZoneNameToOffsetEqualsExpected('Africa/Lagos')
    }

    @test()
    protected async canSetZone() {
        await this.assertSetsZoneName('Africa/Cairo')
        await this.assertSetsZoneName('America/New_York')
    }

    @test('expected zone based on offset 1', 0)
    @test('expected zone based on offset 2', -420)
    @test('expected zone based on offset 3', -240)
    protected matchesFirstZoneNameBasedOnOffset(offset: number) {
        const sorter = new TimezoneChoiceSorter(this.locale)

        const expected =
            offset === 0
                ? 'UTC'
                : sorter
                      .sort(timezoneChoices as any)
                      .map((t) => t.value)
                      .find((name) => {
                          const o = this.locale.zoneNameToOffsetMinutes(
                              name as any
                          )
                          return o === offset
                      })

        const name = this.locale.offsetMinutesToZoneName(offset)

        assert.isEqual(name, expected)
    }

    @test()
    protected async findsOffsetForAllTimezones() {
        timezoneChoices.forEach(({ value }) =>
            this.locale.zoneNameToOffsetMinutes(value)
        )
    }

    @test()
    protected async usesLocaleOffsetToGetFirstZoneName() {
        this.assertUsesLocaleToLoadDefaultZoneName(0, ['UTC'])
        this.assertUsesLocaleToLoadDefaultZoneName(-360, [
            'America/Chicago', // Oct 30th 2am -> April 2nd 2am
            'America/Denver',
            'America/Chicago',
        ])
    }

    @test()
    protected async updatingZoneNameUpdatesOffset() {
        await this.assertSettingZoneNameUpdatesOffset(
            'Africa/Johannesburg',
            120
        )
        await this.assertSettingZoneNameUpdatesOffset('UTC', 0)
        await this.assertSettingZoneNameUpdatesOffset('Europe/Moscow', 180)
    }

    @test()
    protected async formatTimeHonorsZoneName() {
        await this.assertNewDateHonorsLocale(
            'America/Denver',
            {},
            1641056400000
        )
        await this.assertNewDateHonorsLocale(
            'America/Denver',
            { year: 2023 },
            1672592400000
        )
    }

    @test('format time honors local', 'America/Denver', '3am')
    @test('format time honors local', 'Europe/Moscow', '1pm')
    @test('format time honors local', 'Africa/Johannesburg', '12pm')
    protected async formatTimeHonorsLocal(
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
    @test('set time honors local', 'Europe/Moscow')
    @test('set time honors local', 'Africa/Johannesburg')
    protected async settingTimeOfDayHonorsLocale(zone: TimezoneName) {
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
    protected async formatDateTimeHonorsLocale() {
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

    @test('setting zone emits event 1', 'Africa/Lagos')
    @test('setting zone emits event 2', 'Africa/Cairo')
    protected async settingZoneEmitsEvent(zoneName: TimezoneName) {
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
    protected async doesNotFireChangeTimezonesWhenSettingToSame() {
        let hitCount = 0
        await this.locale.on('did-change-timezones', () => {
            hitCount++
        })

        await this.setZone('UTC')
        assert.isEqual(hitCount, 1)
        await this.setZone('UTC')
        assert.isEqual(hitCount, 1)
    }

    @test('start of day honors locale America/Denver', 'America/Denver')
    @test(
        'start of day honors locale America/Los_Angeles',
        'America/Los_Angeles'
    )
    @test('start of day honors locale America/Chicago', 'America/Chicago')
    protected async startOfDayHonorsLocale(zone: TimezoneName) {
        await this.setZone(zone)

        const actual = this.dates.getStartOfDay()
        const expected = this.getExpectedStartOfDay(zone)
        assert.isEqual(actual, expected)
    }

    @test('start of week honors locale America/Denver', 'America/Denver')
    @test(
        'start of week honors locale America/Los_Angeles',
        'America/Los_Angeles'
    )
    @test('start of week honors locale America/Chicago', 'America/Chicago')
    protected async startOfDayWeekLocale(zone: TimezoneName) {
        await this.setZone(zone)

        const actual = this.dates.getStartOfWeek()
        const expected = this.getExpectedStartOfWeek(zone)
        assert.isEqual(actual, expected)
    }

    @test('end of week honors locale America/Denver', 'America/Denver')
    @test(
        'end of week honors locale America/Los_Angeles',
        'America/Los_Angeles'
    )
    @test('end of week honors locale America/Chicago', 'America/Chicago')
    protected async endOfDayWeekLocale(zone: TimezoneName) {
        await this.setZone(zone)

        const actual = this.dates.getEndOfWeek()
        const expected = this.getExpectedEndOfWeek(zone)
        assert.isEqual(actual, expected)
    }

    @test('end of day honors locale America/Denver', 'America/Denver', -7)
    @test('end of day honors locale America/Chicago', 'America/Chicago', -6)
    protected async endOfDayHonorsLocale(zone: TimezoneName) {
        await this.setZone(zone)
        const actual = this.dates.getEndOfDay()
        const expected = this.getExpectedEndOfDay(zone)
        assert.isEqual(actual, expected)
    }

    private getExpectedEndOfDay(timezone: string, timestamp?: number): number {
        // Use the passed timestamp or the current time
        const referenceTime =
            timestamp != null ? new Date(timestamp) : new Date()

        // Convert the reference time to the specified timezone
        const zonedTime = toZonedTime(referenceTime, timezone)

        // Get the end of the day in the specified timezone
        const endOfZonedDay = endOfDay(zonedTime)

        // Convert the end of the zoned day back to UTC
        const endOfUtcDay = fromZonedTime(endOfZonedDay, timezone)

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
        'start of month honors locale America/Chicago',
        1674370800000,
        1672552800000,
        'America/Chicago'
    )
    protected async startOfMonthHonorsLocale(
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
        'end of month honors locale America/Chicago',
        1610737924928,
        1612159199999,
        'America/Chicago'
    )
    protected async endOfMonthHonorsLocale(
        now: number,
        expected: number,
        zone: TimezoneName
    ) {
        await this.setZone(zone)
        const actual = this.dates.getEndOfMonth(now)
        assert.isEqual(actual, expected)
    }

    @test()
    protected async splitDateHonorsLocale() {
        const jan222023 = 1674419514883

        const zone1 = 'America/Denver'
        const zone2 = 'Pacific/Auckland'

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
            hour: 9,
            minute: 31,
        })
    }

    @test()
    protected async dateHonorsDaylightSavingsTimeInDenver() {
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
    protected async sorterUtilityFunctionUpdatesSchema(fieldName: string) {
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
    protected async sorterUtilityDoesNotMutateOriginalSchema() {
        const schema = this.buildSchemaWithTimezoneFieldNamed()
        sortTimezoneChoices(this.locale, schema, 'timezone')
        assert.isEqualDeep(schema.fields.timezone.options.choices, [])
    }

    @test()
    protected async doesNotCrashIfSChemaIsMissingOptions() {
        const schema = this.buildSchemaWithTimezoneFieldNamed()
        //@ts-ignore
        delete schema.fields.timezone.options
        sortTimezoneChoices(this.locale, schema, 'timezone')
    }

    @test()
    protected async getZoneNameOnlyDoesLookupOnce() {
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
    protected async getTimezoneOffsetMinutesCachesByTheHour() {
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
    protected async getZoneNameCachesAfterFirstLookup() {
        this.locale.offsetMinutesToZoneName = () => 'UTC'
        this.getZoneName()
        assert.isEqual(this.locale.currentZone, 'UTC')
    }

    @test()
    protected async canGetDateInLosAngelesAcrossDst() {
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
    protected async honorsDstInLosAngelesWhenGeneratingRepeating() {
        const event: RepeatingCalendarEvent = {
            startDateTimeMs: this.nov4th202312pmLa,
            repeats: 'daily',
            occurrences: 2,
            timeBlocks: [
                { title: 'Session', isBusy: true, durationMinutes: 120 },
            ],
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
    protected async passingTimezoneToGetTimezoneOffsetDoesNotCache() {
        const now = Date.now()
        const offset1 = this.locale.getTimezoneOffsetMinutes(
            now,
            'Europe/Berlin'
        )
        const offset2 = this.locale.getTimezoneOffsetMinutes(
            now,
            'America/Los_Angeles'
        )
        assert.isNotEqual(offset1, offset2)
    }

    @test()
    protected async getTimezoneOffsetWorksWithTimezoneAndNoDate() {
        const now = Date.now()
        const offset1 = this.locale.getTimezoneOffsetMinutes(
            now,
            'Europe/Berlin'
        )

        const offset2 = this.locale.getTimezoneOffsetMinutes(
            undefined,
            'Europe/Berlin'
        )

        assert.isEqual(offset1, offset2)
    }

    @test('can add 1 month to nov 1 in denver', 1, 1698818400000, 1701414000000)
    @test('can add 1 month to dec in denver', 1, 1701414000000, 1704092400000)
    protected async canAddMonthsProperly(
        months: number,
        start: number,
        expected: number
    ) {
        await this.locale.setZoneName('America/Denver')
        const actual = this.dates.addMonths(start, months)
        assert.isEqual(actual, expected)
        const actual2 = this.dates.add(start, months, 'months')
        assert.isEqual(actual2, expected)
    }

    @test(
        'can subtract 1 month to dec 1 in denver',
        1,
        1701414000000,
        1698818400000
    )
    @test(
        'can subtract 1 month to jan 1 in denver',
        1,
        1704092400000,
        1701414000000
    )
    protected async canSubtractMonthsProperly(
        months: number,
        start: number,
        expected: number
    ) {
        await this.locale.setZoneName('America/Denver')
        const actual = this.dates.addMonths(start, months * -1)
        assert.isEqual(actual, expected)
    }

    private getTimezoneOffsetAndAssertHitCount(
        forDate: number,
        expected: number
    ) {
        this.locale.getTimezoneOffsetMinutes(forDate)
        this.assertOffsetMinutesToZoneHitCount(expected)
    }

    private getZoneNameAndHitCount() {
        this.getZoneName()
        const count = this.locale.zoneNameToOffsetMinutesCount
        return count
    }

    private getZoneAndAssertHits(expected: number) {
        this.getZoneName()
        this.assertOffsetMinutesToZoneHitCount(expected)
    }

    private assertOffsetMinutesToZoneHitCount(expected: number) {
        assert.isEqual(this.locale.zoneNameToOffsetMinutesCount, expected)
    }

    private buildSchemaWithTimezoneFieldNamed(fieldName = 'timezone') {
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

    private async setZoneAndSplit(zone: TimezoneName, date: number) {
        await this.setZone(zone)
        return this.dates.splitDate(date)
    }

    private async assertNewDateHonorsLocale(
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

    private getExpectedStartOfDay(timezone: TimezoneName, timestamp?: number) {
        return this.makeZonedTimeUsing(timestamp, timezone, startOfDay)
    }

    private getExpectedStartOfWeek(timezone: TimezoneName, timestamp?: number) {
        return this.makeZonedTimeUsing(timestamp, timezone, startOfWeek)
    }

    private getExpectedEndOfWeek(timezone: TimezoneName, timestamp?: number) {
        return this.makeZonedTimeUsing(timestamp, timezone, endOfWeek)
    }

    private makeZonedTimeUsing(
        timestamp: number | undefined,
        timezone: string,
        func: (date: Date) => Date
    ) {
        const referenceTime =
            timestamp != null ? new Date(timestamp) : new Date()
        const zonedTime = toZonedTime(referenceTime, timezone)
        const startOfZonedDay = func(zonedTime)
        const startOfUtcDay = fromZonedTime(startOfZonedDay, timezone)
        return startOfUtcDay.getTime()
    }

    private assertUsesLocaleToLoadDefaultZoneName(
        offset: number,
        possibleZones: TimezoneName[]
    ) {
        this.locale.setTimezoneOffsetMinutes(offset)
        const a = this.getZoneName()
        assert.isAbove(possibleZones.indexOf(a as any), -1)
    }

    private async assertSetsZoneName(name: TimezoneName) {
        await this.setZone(name)
        this.assertZoneName(name)
    }

    private assertZoneName(name: TimezoneName) {
        assert.isEqual(this.getZoneName(), name)
    }

    private getZoneName(): string {
        return this.locale.getZoneName()
    }

    private assertZoneNameToOffsetEqualsExpected(name: TimezoneName) {
        const expected = getTimezoneOffset(name, Date.now()) / 1000 / 60
        const actual = this.zoneNameToOffsetMinutes(name)
        assert.isEqual(expected, actual)
    }

    private zoneNameToOffsetMinutes(name: TimezoneName): any {
        return this.locale.zoneNameToOffsetMinutes(name)
    }

    private test(offset: number) {
        this.setOffset(offset)
        this.assertOffset(offset)
    }

    private assertOffset(expected: number) {
        assert.isEqual(this.locale.getTimezoneOffsetMinutes(), expected)
    }

    private setOffset(offset: number) {
        this.locale.setTimezoneOffsetMinutes(offset)
    }

    private async assertSettingZoneNameUpdatesOffset(
        name: TimezoneName,
        expected: number
    ) {
        await this.setZone(name)
        this.assertOffset(expected)
    }

    private async setZone(zone: TimezoneName) {
        await this.locale.setZoneName(zone)
    }
}

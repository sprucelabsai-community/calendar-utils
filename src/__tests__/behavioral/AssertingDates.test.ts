import { SchemaRegistry } from '@sprucelabs/schema'
import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
} from '@sprucelabs/test-utils'
import DateUtilDecorator from '../../locales/DateUtilDecorator'
import { DateUtil, TimezoneName } from '../../types/calendar.types'
import dateUtil from '../../utilities/date.utility'
import dateAssert from '../../utilities/dateAssert'
import DateUtilBuilder from '../../utilities/DateUtilBuilder'
import durationUtil from '../../utilities/duration.utility'
import DurationUtilBuilder from '../../utilities/DurationUtilBuilder'
import SpyLocale from './SpyLocale'

export default class AssertingDatesTest extends AbstractSpruceTest {
    private static locale: SpyLocale
    private static dates: DateUtil = dateUtil as DateUtil
    private static decorator: DateUtilDecorator

    protected static async beforeEach() {
        SchemaRegistry.getInstance().forgetAllSchemas()
        await super.beforeEach()
        this.locale = new SpyLocale()
        this.decorator = new DateUtilDecorator(this.locale)
        this.dates = this.decorator.makeLocaleAware(dateUtil)
        DateUtilBuilder.reset()
    }

    @test()
    protected static async makeLocaleAwareMarksItAsLocalAware() {
        assert.doesThrow(() => dateAssert.isLocaleAware(dateUtil))
        dateAssert.isLocaleAware(this.dates)
    }

    @test('can assert timezone 1', 'America/New_York', 'America/Los_Angeles')
    @test('can assert timezone 2', 'America/Los_Angeles', 'America/Chicago')
    protected static async canAssertTimezoneOnDateUtil(
        pass: TimezoneName,
        fail: TimezoneName
    ) {
        assert.doesThrow(() => dateAssert.currentTimezoneEquals(dateUtil, fail))

        await this.locale.setZoneName(pass)

        assert.doesThrow(() =>
            dateAssert.currentTimezoneEquals(this.dates, fail)
        )

        dateAssert.currentTimezoneEquals(this.dates, pass)
    }

    @test()
    protected static async canGetDurationUtilForTimezone() {
        const durationUtil =
            await DurationUtilBuilder.getForTimezone('America/New_York')

        dateAssert.isLocaleAware(durationUtil.dates)
    }

    @test('sets timezone on locale 1', 'America/New_York')
    @test('sets timezone on locale 2', 'Europe/London')
    protected static async setsTheCorrectTimezoneOnTheLocale(
        name: TimezoneName
    ) {
        const durationUtil = await DurationUtilBuilder.getForTimezone(name)
        dateAssert.currentTimezoneEquals(durationUtil.dates, name)
    }

    @test()
    protected static async canAssertDateUtilIsLocaleAware() {
        const durationUtil =
            await DurationUtilBuilder.getForTimezone('America/New_York')
        dateAssert.isLocaleAware(durationUtil)
    }

    @test()
    protected static async throwsWhenDateUtilNotLocaleAware() {
        assert.doesThrow(() => {
            dateAssert.isLocaleAware(durationUtil)
        })
    }

    @test('can assert timezone 1', 'America/New_York', 'Europe/London')
    @test('can assert timezone 2', 'Europe/London', 'America/New_York')
    protected static async canAssertTimezone(
        pass: TimezoneName,
        fail: TimezoneName
    ) {
        const durationUtil = await DurationUtilBuilder.getForTimezone(pass)
        dateAssert.currentTimezoneEquals(durationUtil, pass)
        assert.doesThrow(() =>
            dateAssert.currentTimezoneEquals(durationUtil, fail)
        )
    }

    @test('can build date util for America/New_York', 'America/New_York')
    @test('can build date util for Europe/London', 'Europe/London')
    protected static async canBuildDateUtilForTimezone(timezone: TimezoneName) {
        const dateUtil = await DateUtilBuilder.getForTimezone(timezone)
        dateAssert.isLocaleAware(dateUtil)
        dateAssert.currentTimezoneEquals(dateUtil, timezone)
    }

    @test()
    protected static async dateUtilBuilderTracksLastBuilt() {
        const dateUtil =
            await DateUtilBuilder.getForTimezone('America/New_York')
        assert.isEqual(DateUtilBuilder.lastBuiltDateUtil, dateUtil)
    }

    @test()
    protected static async dateAssertBuiltTimezoneThrowsWhenNothingWasBuilt() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            dateAssert.timezoneOfLastBuiltDateUtilEquals()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['timezone'],
        })
    }

    @test()
    protected static async throwsIfDateUtilNotLocaleAware() {
        assert.doesThrow(
            () =>
                dateAssert.timezoneOfLastBuiltDateUtilEquals(
                    'America/New_York'
                ),
            'aware'
        )
    }

    @test(
        'last built throws when timezones dont match 1',
        'America/New_York',
        'America/Los_Angeles'
    )
    protected static async lastBuiltThrowsWhenTimezoneDoesNotMatch(
        tz1: TimezoneName,
        tz2: TimezoneName
    ) {
        await DateUtilBuilder.getForTimezone(tz1)
        assert.doesThrow(
            () => dateAssert.timezoneOfLastBuiltDateUtilEquals(tz2),
            'timezone is not'
        )
    }

    @test('last built matches if timezone matches', 'America/New_York')
    @test('last built matches if timezone matches 2', 'Europe/London')
    protected static async lastBuiltMatchesIfTimezoneMatches(
        timezone: TimezoneName
    ) {
        await DateUtilBuilder.getForTimezone(timezone)
        dateAssert.timezoneOfLastBuiltDateUtilEquals(timezone)
    }
}

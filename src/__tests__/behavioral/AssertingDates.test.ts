import { SchemaRegistry } from '@sprucelabs/schema'
import AbstractSpruceTest, {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import DateUtilDecorator from '../../locales/DateUtilDecorator'
import { DateUtil, TimezoneName } from '../../types/calendar.types'
import dateUtil from '../../utilities/date.utility'
import dateAssert from '../../utilities/dateAssert'
import DateUtilBuilder from '../../utilities/DateUtilBuilder'
import decorateDateUtilWithMockMethods, {
    MockDateUtil,
} from '../../utilities/decorateDateUtilWithMockMethods.utility'
import durationUtil from '../../utilities/duration.utility'
import DurationUtilBuilder from '../../utilities/DurationUtilBuilder'
import SpyLocale from './SpyLocale'

@suite()
export default class AssertingDatesTest extends AbstractSpruceTest {
    private locale!: SpyLocale
    private dates: DateUtil = dateUtil as DateUtil
    private decorator!: DateUtilDecorator

    private mockDateUtil!: MockDateUtil

    protected async beforeEach() {
        SchemaRegistry.getInstance().forgetAllSchemas()
        await super.beforeEach()
        this.locale = new SpyLocale()
        this.decorator = new DateUtilDecorator(this.locale)
        this.dates = this.decorator.makeLocaleAware(dateUtil)
        this.mockDateUtil = decorateDateUtilWithMockMethods(dateUtil)
        DateUtilBuilder.reset()
    }

    @test()
    protected async makeLocaleAwareMarksItAsLocalAware() {
        assert.doesThrow(() => dateAssert.isLocaleAware(dateUtil))
        dateAssert.isLocaleAware(this.dates)
    }

    @test('can assert timezone 1', 'America/New_York', 'America/Los_Angeles')
    @test('can assert timezone 2', 'America/Los_Angeles', 'America/Chicago')
    protected async canAssertTimezoneOnDateUtil(
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
    protected async canGetDurationUtilForTimezone() {
        const durationUtil =
            await DurationUtilBuilder.getForTimezone('America/New_York')

        dateAssert.isLocaleAware(durationUtil.dates)
    }

    @test('sets timezone on locale 1', 'America/New_York')
    @test('sets timezone on locale 2', 'Europe/London')
    protected async setsTheCorrectTimezoneOnTheLocale(name: TimezoneName) {
        const durationUtil = await DurationUtilBuilder.getForTimezone(name)
        dateAssert.currentTimezoneEquals(durationUtil.dates, name)
    }

    @test()
    protected async canAssertDateUtilIsLocaleAware() {
        const durationUtil =
            await DurationUtilBuilder.getForTimezone('America/New_York')
        dateAssert.isLocaleAware(durationUtil)
    }

    @test()
    protected async throwsWhenDateUtilNotLocaleAware() {
        assert.doesThrow(() => {
            dateAssert.isLocaleAware(durationUtil)
        })
    }

    @test('can assert timezone 1', 'America/New_York', 'Europe/London')
    @test('can assert timezone 2', 'Europe/London', 'America/New_York')
    protected async canAssertTimezone(pass: TimezoneName, fail: TimezoneName) {
        const durationUtil = await DurationUtilBuilder.getForTimezone(pass)
        dateAssert.currentTimezoneEquals(durationUtil, pass)
        assert.doesThrow(() =>
            dateAssert.currentTimezoneEquals(durationUtil, fail)
        )
    }

    @test('can build date util for America/New_York', 'America/New_York')
    @test('can build date util for Europe/London', 'Europe/London')
    protected async canBuildDateUtilForTimezone(timezone: TimezoneName) {
        const dateUtil = await DateUtilBuilder.getForTimezone(timezone)
        dateAssert.isLocaleAware(dateUtil)
        dateAssert.currentTimezoneEquals(dateUtil, timezone)
    }

    @test()
    protected async dateUtilBuilderTracksLastBuilt() {
        const dateUtil =
            await DateUtilBuilder.getForTimezone('America/New_York')
        assert.isEqual(DateUtilBuilder.lastBuiltDateUtil, dateUtil)
    }

    @test()
    protected async dateAssertBuiltTimezoneThrowsWhenNothingWasBuilt() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            dateAssert.timezoneOfLastBuiltDateUtilEquals()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['timezone'],
        })
    }

    @test()
    protected async throwsIfDateUtilNotLocaleAware() {
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
    protected async lastBuiltThrowsWhenTimezoneDoesNotMatch(
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
    protected async lastBuiltMatchesIfTimezoneMatches(timezone: TimezoneName) {
        await DateUtilBuilder.getForTimezone(timezone)
        dateAssert.timezoneOfLastBuiltDateUtilEquals(timezone)
    }

    @test()
    protected async mockDateUtilHasSameMethodsAsDateUtil() {
        for (const method of this.dateUtilMethods) {
            assert.isFunction(
                //@ts-ignore
                this.mockDateUtil[method],
                `dateUtil.${method} is not a function`
            )
        }
    }

    @test()
    protected async everyFunctionHasAnAssertVersionOfIt() {
        for (const method of this.dateUtilMethods) {
            const assertionName = `assert${method.charAt(0).toUpperCase()}${method.slice(
                1
            )}Called`
            assert.isFunction(
                //@ts-ignore
                this.mockDateUtil[assertionName],
                `mockDateUtil.${assertionName} is not a function`
            )
        }
    }

    @test()
    protected async assertStartOfDayThrowsIfNotActuallyCalled() {
        assert.doesThrow(
            () => this.mockDateUtil.assertGetStartOfDayCalled(),
            'not called'
        )
    }

    @test()
    protected async getStartOfDayDoesNotThrowIfCalled() {
        this.mockDateUtil.getStartOfDay()
        this.mockDateUtil.assertGetStartOfDayCalled()
    }

    @test()
    protected async canAssertIfCalledOnMultipleMethods() {
        this.mockDateUtil.getStartOfDay()
        this.mockDateUtil.assertGetStartOfDayCalled()

        assert.doesThrow(
            () => this.mockDateUtil.assertGetStartOfWeekCalled(),
            'not called'
        )
        this.mockDateUtil.getStartOfWeek()
        this.mockDateUtil.assertGetStartOfWeekCalled()
    }

    @test()
    protected async throwsIfParamatersDontMatch() {
        this.mockDateUtil.format(Date.now(), 'yyyy-MM-dd')
        assert.doesThrow(
            () =>
                this.mockDateUtil.assertFormatCalled(
                    Date.now() + 100,
                    generateId()
                ),
            'expected'
        )
    }

    @test()
    protected async mockDateUtilReturnsSameValuesAsDateUtil() {
        assert.isEqual(
            this.mockDateUtil.getStartOfDay(),
            dateUtil.getStartOfDay()
        )

        assert.isEqual(
            this.mockDateUtil.getStartOfWeek(),
            dateUtil.getStartOfWeek()
        )

        assert.isEqual(
            this.mockDateUtil.addDays(this.mockDateUtil.getStartOfDay(), 100),
            dateUtil.addDays(dateUtil.getStartOfDay(), 100)
        )
    }

    @test()
    protected async dateUtilBuilderCanUseMockDateUtil() {
        DateUtilBuilder.didBuild((dateUtil) =>
            decorateDateUtilWithMockMethods(dateUtil)
        )

        const dateUtil = (await DateUtilBuilder.getForTimezone(
            'America/New_York'
        )) as MockDateUtil

        dateUtil.getStartOfDay()
        dateUtil.assertGetStartOfDayCalled()
    }

    @test()
    protected async dateUtilBuilderCanUseMockToCheckArgs() {
        DateUtilBuilder.didBuild((dateUtil) =>
            decorateDateUtilWithMockMethods(dateUtil)
        )

        const dateUtil = (await DateUtilBuilder.getForTimezone(
            'America/New_York'
        )) as MockDateUtil

        const date = Date.now()
        const format = 'yyyy-MM-dd'

        dateUtil.format(date, format)
        dateUtil.assertFormatCalled(date, format)
    }

    @test()
    protected async dateUtilBuilderResetsDidBuildHandler() {
        DateUtilBuilder.didBuild((dateUtil) =>
            decorateDateUtilWithMockMethods(dateUtil)
        )
        DateUtilBuilder.reset()

        const dateUtil = (await DateUtilBuilder.getForTimezone(
            'America/New_York'
        )) as MockDateUtil

        assert.doesThrow(() => assert.isFunction(dateUtil.assertAddDaysCalled))
    }

    private get dateUtilMethods() {
        return Object.keys(dateUtil).filter(
            //@ts-ignore
            (key) => typeof dateUtil[key] === 'function'
        ) as (keyof typeof dateUtil)[]
    }
}

import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import { TimezoneName } from '../../types/calendar.types'
import dateUtil from '../../utilities/date.utility'
import dateAssert from '../../utilities/dateAssert'
import durationUtil from '../../utilities/duration.utility'
import DurationUtilBuilder from '../../utilities/DurationUtilBuilder'

export default class DurationUtilTest extends AbstractSpruceTest {
    @test('1sec', 1000, '1sec')
    @test('500ms', 500, '500ms')
    @test('30min', 1800000, '30min')
    @test('1.5sec', 1500, '1.5sec')
    @test('1hr', 1000 * 60 * 60, '1hr')
    @test('1hr30min', 1000 * 60 * 60 + 1000 * 60 * 30, '1hr30min')
    @test(
        '1hr15min & 10sec',
        1000 * 60 * 60 + 1000 * 60 * 15 + 1000 * 10,
        '1hr15min & 10sec'
    )
    @test(
        '1hr15min & 10.75sec',
        1000 * 60 * 60 + 1000 * 60 * 15 + 1000 * 10 + 750,
        '1hr15min & 10.75sec'
    )
    protected static async canCreateDurationUtil(
        duration: number,
        expected: string
    ) {
        const actual = durationUtil.renderDuration(duration)
        assert.isEqual(actual, expected)
    }

    @test(
        'can render time range 1',
        dateUtil.setTimeOfDay(new Date().getTime(), 1, 0, 0, 0),
        dateUtil.setTimeOfDay(new Date().getTime(), 1, 30, 0, 0),
        '1am to 1:30am'
    )
    @test(
        'can render time range 2',
        dateUtil.setTimeOfDay(Date.UTC(2023), 2, 0, 0, 0),
        dateUtil.setTimeOfDay(Date.UTC(2023), 2, 45, 0, 0),
        '2am to 2:45am'
    )
    protected static canRenderTimeRanges(
        date1: number,
        date2: number,
        expected: string
    ) {
        const actual = durationUtil.renderTimeRange(date1, date2)
        assert.isEqual(actual, expected)
    }

    @test()
    protected static usesDateUtilOnObject() {
        durationUtil.dates.formatTime = () => {
            return 'aoeu'
        }

        const actual = durationUtil.renderTimeRange(
            new Date().getTime(),
            new Date().getTime()
        )
        assert.isEqual(actual, 'aoeu to aoeu')
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
    protected static async shouldNotBeTheSameDurationUtil() {
        const durationUtil1 =
            await DurationUtilBuilder.getForTimezone('America/New_York')
        const durationUtil2 =
            await DurationUtilBuilder.getForTimezone('Europe/London')

        assert.isNotEqual(durationUtil1, durationUtil2)
    }

    @test()
    protected static async canMonkeyPatchDurationUtilOnBuilder() {
        DurationUtilBuilder.durationUtil.renderDuration = () => {
            return 'go'
        }

        const durationUtil =
            await DurationUtilBuilder.getForTimezone('America/New_York')

        const actual = durationUtil.renderDuration(1000)
        assert.isEqual(actual, 'go')

        DurationUtilBuilder.reset()

        const durationUtil2 =
            await DurationUtilBuilder.getForTimezone('America/New_York')

        const actual2 = durationUtil2.renderDuration(1000)
        assert.isNotEqual(actual2, 'go')
    }

    @test()
    protected static async monkeyPatchAfterResetDoesNotAffectOriginal() {
        DurationUtilBuilder.reset()
        DurationUtilBuilder.durationUtil.renderDuration = () => {
            return 'dogs'
        }

        const actual = durationUtil.renderDuration(1000)
        assert.isEqual(actual, '1sec')
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
}

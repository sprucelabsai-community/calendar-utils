import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import { lunch, tomorrowLunch } from '../../dates'
import calculateEventDurationMillis from '../../durationCalculators/calculateEventDurationMillis'
import calculateEventDurationMinutes from '../../durationCalculators/calculateEventDurationMinutes'
import dateUtil from '../../utilities/date.utility'
import durationUtil, {
    TimeUntilPrefixOptions,
} from '../../utilities/duration.utility'
import generateEventValues from './generateEventValues'

const MONTH_DAY_FORMAT = 'MMM do'
//extracted from calendar skill, most tests there.
export default class DurationCalculatorTest extends AbstractSpruceTest {
    @test()
    protected static async canCalculateDurationMillis() {
        const event = generateEventValues()
        const durationMin = calculateEventDurationMinutes(event)
        const expected = durationMin * 60 * 1000
        const actual = calculateEventDurationMillis(event)
        assert.isEqual(actual, expected)
    }

    @test(
        'sets expected startDateAndTime to tomorrow',
        tomorrowLunch(),
        'tomorrow @ 12pm'
    )
    @test('sets expected startDateAndTime to today', lunch(), 'today @ 12pm')
    @test(
        'sets expected startDateAndTime to day after tomorrow',
        dateUtil.addDays(lunch(), 2),
        dateUtil.format(dateUtil.addDays(lunch(), 2), MONTH_DAY_FORMAT) +
            ' (in 2 days) @ 12pm'
    )
    @test(
        'sets expected startDateAndTime for in 3 days',
        dateUtil.addDays(lunch(), 3),
        dateUtil.format(dateUtil.addDays(lunch(), 3), MONTH_DAY_FORMAT) +
            ' (in 3 days) @ 12pm'
    )
    @test(
        'sets expected startDateAndTime tomorrow at 1230',
        dateUtil.addMinutes(tomorrowLunch(), 30),
        'tomorrow @ 12:30pm'
    )
    @test(
        'sets expected startDateAndTime yesterday at 12',
        dateUtil.addDays(lunch(), -1),
        'yesterday @ 12pm'
    )
    @test(
        'sets expected startDateAndTime for back 3 days',
        dateUtil.addDays(lunch(), -3),
        dateUtil.format(dateUtil.addDays(lunch(), -3), MONTH_DAY_FORMAT) +
            ' (3 days ago) @ 12pm'
    )
    protected static async expectedFriendlyStartBasedOnFirstBookedService(
        date: number,
        expected: string
    ) {
        const actual = this.timeUntil(date, {
            future: 'for',
            past: 'for',
            today: 'for',
            tomorrow: 'for',
            yesterday: 'for',
        })
        assert.isEqual(actual, 'for ' + expected)
    }

    @test()
    protected static async canChangeTheSuffixForToday() {
        const actual = this.timeUntil(lunch(), { today: 'is' })
        assert.isEqual(actual.substring(0, 3), `is `)
    }

    @test()
    protected static async canChangeTheSuffixes() {
        this.assertExpectedPrefix(tomorrowLunch(), 'tomorrow', 'future')
        this.assertExpectedPrefix(
            dateUtil.addDays(lunch(), -1),
            'yesterday',
            'past'
        )
        this.assertExpectedPrefix(
            dateUtil.addDays(lunch(), 10),
            'future',
            'future'
        )
        this.assertExpectedPrefix(
            dateUtil.addDays(lunch(), -10),
            'past',
            'back'
        )
    }

    @test()
    protected static async nullPrefixRendersNoPrefix() {
        const actual = this.timeUntilWithPrefix(lunch(), 'today', null)
        const expected = 'today @ 12pm'
        assert.isEqual(actual, expected)
    }

    @test()
    protected static async canCapitalizeFirst() {
        this.assertTimeUntilCapitalized(lunch(), 'Today @ 12pm')

        this.assertTimeUntilCapitalized(
            dateUtil.addDays(lunch(), -1),
            'Yesterday @ 12pm'
        )

        this.assertTimeUntilCapitalized(
            dateUtil.addMinutes(tomorrowLunch(), 30),
            'Tomorrow @ 12:30pm'
        )
    }

    private static assertTimeUntilCapitalized(
        tomorrow: number,
        expected: string
    ) {
        const actual = this.timeUntil(tomorrow, {
            shouldCapitalize: true,
        })
        assert.isEqual(actual, expected)
    }

    private static assertExpectedPrefix(
        date: number,
        key: keyof TimeUntilPrefixOptions,
        prefix: string
    ) {
        const actual = this.timeUntilWithPrefix(date, key, prefix)
        assert.isEqual(actual.substring(0, prefix.length + 1), `${prefix} `)
    }

    private static timeUntilWithPrefix(
        date: number,
        key: keyof TimeUntilPrefixOptions,
        prefix: string | null
    ) {
        return this.timeUntil(date, { [key]: prefix })
    }

    private static timeUntil(
        date: number,
        options?: Partial<TimeUntilPrefixOptions>
    ) {
        return durationUtil.renderDateTimeUntil(
            date,
            new Date().getTime(),
            options
        )
    }
}

import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import calendarUtil from '../../utilities/calendar.utility'
import dateUtil from '../../utilities/date.utility'

export default class CalendarUtilTest extends AbstractSpruceTest {
	@test()
	public static async applyRuleAndGetEventsPassesThroughOneTimeBlock() {
		const start = dateUtil.getStartOfDay()
		const dateUntil = dateUtil.addDays(start, 7)
		const events = calendarUtil.applyRuleAndGetEvents(
			{
				startDateTimeMs: start,
				repeats: 'daily',
				timeBlocks: [{ title: 'Session', isBusy: false, durationMinutes: 60 }],
			},
			dateUntil,
			'UTC'
		)

		assert.isTruthy(events)
		assert.isLength(events, 8)
		assert.isEqual(events[0]?.timeBlocks[0]?.title, 'Session')
		assert.isEqual(events[0]?.timeBlocks[0]?.isBusy, false)
		assert.isEqual(events[0]?.timeBlocks[0]?.durationMinutes, 60)
	}

	@test()
	public static async applyRuleAndGetEventsPassesThroughTwoTimeBlocks() {
		const start = dateUtil.getStartOfDay()
		const dateUntil = dateUtil.addDays(start, 7)
		const events = calendarUtil.applyRuleAndGetEvents(
			{
				startDateTimeMs: start,
				repeats: 'daily',
				timeBlocks: [
					{ title: 'Session', isBusy: true, durationMinutes: 120 },
					{ title: 'Lunch', isBusy: false, durationMinutes: 60 },
				],
			},
			dateUntil,
			'UTC'
		)

		assert.isTruthy(events)
		assert.isLength(events, 8)
		assert.isEqual(events[0]?.timeBlocks[0]?.title, 'Session')
		assert.isEqual(events[0]?.timeBlocks[0]?.isBusy, true)
		assert.isEqual(events[0]?.timeBlocks[0]?.durationMinutes, 120)
		assert.isEqual(events[0]?.timeBlocks[1]?.title, 'Lunch')
		assert.isEqual(events[0]?.timeBlocks[1]?.isBusy, false)
		assert.isEqual(events[0]?.timeBlocks[1]?.durationMinutes, 60)
	}

	@test('applyRuleAndGetMonthlyRepeatingDaysOfMonth 0 hour', 0)
	@test('applyRuleAndGetMonthlyRepeatingDaysOfMonth 13 hour', 13)
	public static async applyRuleAndGetMonthlyRepeatingDaysOfMonth(hour: number) {
		const start = this.getStart({
			hour,
		})

		const events = this.applyRulesAndGetEventsForNMonths(start, 7, {
			daysOfMonth: ['7'],
		})
		assert.isTruthy(events)

		const eventsSplitDate = events.map((e) => {
			return dateUtil.splitDate(e.startDateTimeMs)
		})

		assert.isLength(events, 7)

		assert.isEqualDeep(eventsSplitDate, [
			{ year: 2020, month: 0, day: 7, hour, minute: 0 },
			{ year: 2020, month: 1, day: 7, hour, minute: 0 },
			{ year: 2020, month: 2, day: 7, hour, minute: 0 },
			{ year: 2020, month: 3, day: 7, hour, minute: 0 },
			{ year: 2020, month: 4, day: 7, hour, minute: 0 },
			{ year: 2020, month: 5, day: 7, hour, minute: 0 },
			{ year: 2020, month: 6, day: 7, hour, minute: 0 },
		])
	}

	@test('applyRuleAndGetMonthlyRepeating 0 hour', 0)
	@test('applyRuleAndGetMonthlyRepeating 13 hour', 13)
	public static async applyRuleAndGetMonthlyRepeating(hour: number) {
		const start = this.getStart({
			day: 3,
			hour,
		})

		const events = this.applyRulesAndGetEventsForNMonths(start, 7, {})

		assert.isTruthy(events)
		const eventsSplitDate = events.map((e) => {
			return dateUtil.splitDate(e.startDateTimeMs)
		})

		assert.isLength(events, 8)

		assert.isEqualDeep(eventsSplitDate, [
			{ year: 2020, month: 0, day: 3, hour, minute: 0 },
			{ year: 2020, month: 1, day: 3, hour, minute: 0 },
			{ year: 2020, month: 2, day: 3, hour, minute: 0 },
			{ year: 2020, month: 3, day: 3, hour, minute: 0 },
			{ year: 2020, month: 4, day: 3, hour, minute: 0 },
			{ year: 2020, month: 5, day: 3, hour, minute: 0 },
			{ year: 2020, month: 6, day: 3, hour, minute: 0 },
			{ year: 2020, month: 7, day: 3, hour, minute: 0 },
		])
	}

	@test(
		'applyRuleAndGetMonthlyRepeatingDaysOfMonth 0 hour',
		0,
		['9', '17'],
		[
			{ year: 2020, month: 6, day: 17, hour: 0, minute: 0 },
			{ year: 2020, month: 7, day: 9, hour: 0, minute: 0 },
			{ year: 2020, month: 7, day: 17, hour: 0, minute: 0 },
			{ year: 2020, month: 8, day: 9, hour: 0, minute: 0 },
			{ year: 2020, month: 8, day: 17, hour: 0, minute: 0 },
			{ year: 2020, month: 9, day: 9, hour: 0, minute: 0 },
		]
	)
	@test(
		'applyRuleAndGetMonthlyRepeatingDaysOfMonth 13 hour',
		13,
		['2', '4', '6'],
		[
			{ year: 2020, month: 7, day: 2, hour: 13, minute: 0 },
			{ year: 2020, month: 7, day: 4, hour: 13, minute: 0 },
			{ year: 2020, month: 7, day: 6, hour: 13, minute: 0 },
			{ year: 2020, month: 8, day: 2, hour: 13, minute: 0 },
			{ year: 2020, month: 8, day: 4, hour: 13, minute: 0 },
			{ year: 2020, month: 8, day: 6, hour: 13, minute: 0 },
			{ year: 2020, month: 9, day: 2, hour: 13, minute: 0 },
			{ year: 2020, month: 9, day: 4, hour: 13, minute: 0 },
			{ year: 2020, month: 9, day: 6, hour: 13, minute: 0 },
		]
	)
	public static async applyRuleAndGetMonthlyRepeatingMultipleDaysOfMonth(
		hour: number,
		daysOfMonth: string[],
		expected: any
	) {
		const start = this.getStart({
			month: 6,
			day: 11,
			hour,
		})

		const events = this.applyRulesAndGetEventsForNMonths(start, 3, {
			daysOfMonth,
		})

		assert.isTruthy(events)
		const eventsSplitDate = events.map((e) => {
			return dateUtil.splitDate(e.startDateTimeMs)
		})

		assert.isLength(events, expected.length)
		assert.isEqualDeep(eventsSplitDate, expected)
	}

	@test()
	public static async applyRuleAndGetMonthlyRepeatingIncludesNthInRepeating() {
		const start = this.getStart()

		const events = this.applyRulesAndGetEventsForNMonths(start, 3, {
			daysOfMonth: ['7'],
		})

		assert.isNumber(events[0].nthInRepeating)
		for (const [idx, event] of events.entries()) {
			assert.isEqual(event.nthInRepeating, idx)
		}
	}

	@test()
	public static async getEventFromRangeByDateMonthlyRepeatingIncludesNthInRepeating() {
		const start = this.getStart()
		const dateUntil = dateUtil.addMonths(start, 3)
		const event = this.getEventFromRangeByDate(start, dateUntil)

		assert.isTruthy(event)
		assert.isNumber(event.nthInRepeating)
		assert.isEqual(event.nthInRepeating, 3)
	}

	@test()
	public static async applyRuleAndGetMonthlyRepeatingIncludesTotalInRepeating() {
		const start = this.getStart()

		const events = this.applyRulesAndGetEventsForNMonths(start, 10, {
			daysOfMonth: ['7'],
		})

		assert.isNumber(events[0].totalInRepeating)
		for (const event of events) {
			assert.isEqual(event.totalInRepeating, 10)
		}
	}

	@test()
	public static async getEventFromRangeByDateMonthlyRepeatingIncludesTotalInRepeating() {
		const start = dateUtil.getStartOfMonth(new Date().getTime())

		const event = this.getEventFromRangeByDate(
			start,
			dateUtil.addMonths(start, 3)
		)

		assert.isTruthy(event)
		assert.isNumber(event.totalInRepeating)
		assert.isAbove(event.totalInRepeating, 118)
		assert.isBelow(event.totalInRepeating, 122)

		const event2 = this.getEventFromRangeByDate(
			start,
			dateUtil.addMonths(start, 13)
		)
		assert.isEqual(event2?.totalInRepeating, event.totalInRepeating)
	}

	private static applyRulesAndGetEventsForNMonths(
		start: number,
		months: number,
		values: any
	) {
		const dateUntil = dateUtil.addMonths(start, months)
		const events = calendarUtil.applyRuleAndGetEvents(
			{
				startDateTimeMs: start,
				repeats: 'monthly',
				timeBlocks: [{ title: 'Session', isBusy: true, durationMinutes: 120 }],
				...values,
			},
			dateUntil,
			'UTC'
		)
		return events
	}

	private static getEventFromRangeByDate(start: number, dateUntil: number) {
		return calendarUtil.getEventFromRangeByDate(
			{
				startDateTimeMs: start,
				repeats: 'monthly',
				timeBlocks: [{ title: 'Session', isBusy: true, durationMinutes: 120 }],
				daysOfMonth: ['1'],
			},
			dateUntil,
			'UTC'
		)
	}

	private static getStart(values?: {
		year?: number
		month?: number
		day?: number
		hour?: number
	}) {
		return this.getUTCTimestampForDay({
			year: 2020,
			month: 0,
			day: 1,
			hour: 18,
			...values,
		})
	}

	private static getUTCTimestampForDay(date: {
		year: number
		month: number
		day: number
		hour?: number
		minute?: number
		seconds?: number
	}) {
		return new Date(
			Date.UTC(
				date.year,
				date.month,
				date.day,
				date.hour ?? 0,
				date.minute ?? 0,
				date.seconds ?? 0
			)
		).getTime()
	}
}

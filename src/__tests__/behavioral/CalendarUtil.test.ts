import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { dateUtil } from '../..'
import calendarUtil from '../../utilities/calendar.utility'

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
			dateUntil
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
			dateUntil
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
}

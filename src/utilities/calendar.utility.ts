import RRule from 'rrule'
import { CalendarEvent } from '../types/calendar.types'
import dateUtil from './date.utility'

const calendarUtil = {
	freqMapToRRule: {
		weekly: RRule.WEEKLY,
		monthly: RRule.MONTHLY,
		daily: RRule.DAILY,
	},

	weekDaysMapToRRuleDays: {
		mon: RRule.MO,
		tue: RRule.TU,
		wed: RRule.WE,
		thur: RRule.TH,
		fri: RRule.FR,
		sat: RRule.SA,
		sun: RRule.SU,
	},

	applyRuleAndGetEvents(
		e: Pick<
			CalendarEvent,
			| 'repeats'
			| 'repeatsUntil'
			| 'daysOfWeek'
			| 'interval'
			| 'startDate'
			| 'occurrences'
			| 'nthOccurrences'
			| 'endDate'
		>,
		dateUntil: number
	) {
		const events = this.applyRuleAndGetEventsWithoutExclusion(e, dateUntil)
		const excludedEvents = events.filter((e) => !this.isExcluded(e))

		return excludedEvents
	},
	applyRuleAndGetEventsWithoutExclusion(
		e: Pick<
			CalendarEvent,
			| 'repeats'
			| 'repeatsUntil'
			| 'daysOfWeek'
			| 'interval'
			| 'startDate'
			| 'occurrences'
			| 'nthOccurrences'
			| 'endDate'
		>,
		dateUntil: number
	) {
		let repeatsUntil: number | undefined

		if (e.repeats) {
			if (e.repeatsUntil) {
				repeatsUntil = Math.min(e.repeatsUntil, dateUntil)
			} else {
				repeatsUntil = dateUntil
			}

			const rule = new RRule({
				freq: this.freqMapToRRule[e.repeats],
				interval: e.interval ?? 1,
				byweekday: e.daysOfWeek?.map((d) => this.weekDaysMapToRRuleDays[d]),
				dtstart: new Date(e.startDate),
				until: new Date(repeatsUntil),
				count: e.occurrences,
				bysetpos: e.nthOccurrences?.map((o) => {
					if (o >= 0) {
						++o
					}
					return o
				}),
			})

			const events = this.filterEventRulesAndGetEvents(rule, e)

			return events
		}

		return [e]
	},
	filterEventRulesAndGetEvents(
		rule: RRule,
		e: Pick<CalendarEvent, 'startDate' | 'endDate'>
	) {
		const duration = dateUtil.getDurationMs(e.startDate, e.endDate)
		let events = rule.all().map((r) => ({
			...e,
			startDate: r.getTime(),
			endDate: dateUtil.addMilliseconds(r.getTime(), duration),
		})) as CalendarEvent[]

		return events
	},
	isExcluded(e: Pick<CalendarEvent, 'exclusionDates' | 'startDate'>) {
		if (e.exclusionDates) {
			const splitedStartDate = dateUtil.splitDate(e.startDate)

			const isExcluded = e.exclusionDates.find((d) => {
				if (
					splitedStartDate.year === d.year &&
					splitedStartDate.month === d.month &&
					splitedStartDate.day === d.day
				) {
					return true
				}
				return false
			})
			if (isExcluded) {
				return true
			}
		}
		return false
	},

	getEventFromRangeByDate(
		values: Pick<
			CalendarEvent,
			| 'repeats'
			| 'repeatsUntil'
			| 'daysOfWeek'
			| 'interval'
			| 'startDate'
			| 'occurrences'
			| 'nthOccurrences'
			| 'endDate'
		>,
		date: number
	) {
		const dateUntil = dateUtil.addYears(new Date().getTime(), 10)
		const searchDate = dateUtil.splitDate(date)
		const repeatingEvents = this.applyRuleAndGetEvents(values, dateUntil)
		return repeatingEvents.find((e) => {
			const event = dateUtil.splitDate(e.startDate)
			if (
				searchDate.year === event.year &&
				searchDate.month === event.month &&
				searchDate.day === event.day
			) {
				return true
			}
			return false
		})
	},
}

export default calendarUtil

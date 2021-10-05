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
			| 'startDateTimeMs'
			| 'occurrences'
			| 'nthOccurrences'
			| 'endDateTimeMs'
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
			| 'startDateTimeMs'
			| 'occurrences'
			| 'nthOccurrences'
			| 'endDateTimeMs'
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
				dtstart: new Date(e.startDateTimeMs),
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
		e: Pick<CalendarEvent, 'startDateTimeMs' | 'endDateTimeMs'>
	) {
		const duration = dateUtil.getDurationMs(e.startDateTimeMs, e.endDateTimeMs)
		let events = rule.all().map((r) => ({
			...e,
			startDateTimeMs: r.getTime(),
			endDateTimeMs: dateUtil.addMilliseconds(r.getTime(), duration),
		})) as CalendarEvent[]

		return events
	},
	isExcluded(e: Pick<CalendarEvent, 'exclusionDates' | 'startDateTimeMs'>) {
		if (e.exclusionDates) {
			const splitedStartDate = dateUtil.splitDate(e.startDateTimeMs)

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
			| 'startDateTimeMs'
			| 'occurrences'
			| 'nthOccurrences'
			| 'endDateTimeMs'
		>,
		date: number
	) {
		const dateUntil = dateUtil.addYears(new Date().getTime(), 10)
		const searchDate = dateUtil.splitDate(date)
		const repeatingEvents = this.applyRuleAndGetEvents(values, dateUntil)
		return repeatingEvents.find((e) => {
			const event = dateUtil.splitDate(e.startDateTimeMs)
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

import { startOfDay } from 'date-fns'
import { startOfMonth } from 'date-fns'
import { addDays } from 'date-fns'
import { addMonths } from 'date-fns'
import { addYears } from 'date-fns'
import { endOfWeek } from 'date-fns'
import { addMilliseconds, endOfDay, getDay, startOfWeek } from 'date-fns'
import addMinutes from 'date-fns/addMinutes'
import RRule from 'rrule'

type DayOfWeek = 'sun' | 'mon' | 'tue' | 'wed' | 'thur' | 'fri' | 'sat'

export interface IDate {
	month: number
	day: number
	year: number
	hour?: number
	minute?: number
}

interface Event {
	repeats?: 'weekly' | 'monthly' | 'daily'
	repeatsUntil?: number
	interval?: number
	daysOfWeek?: DayOfWeek[]
	startDate: number
	endDate: number
	occurrences?: number
	nthOccurrences?: number[]
	exclusionDates?: ExclusionDates[]
}

interface ExclusionDates {
	year: number
	month: number
	day: number
}

const dateUtil = {
	eventDaysOfWeek: [
		'sun',
		'mon',
		'tue',
		'wed',
		'thur',
		'fri',
		'sat',
	] as DayOfWeek[],

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

	getStartOfDay(timestamp?: number) {
		if (!timestamp) {
			timestamp = new Date().getTime()
		}
		return startOfDay(timestamp).getTime()
	},
	getStartOfWeek(timestamp?: number) {
		if (!timestamp) {
			timestamp = new Date().getTime()
		}
		return startOfWeek(timestamp).getTime()
	},
	getEndOfDay(timestamp?: number) {
		if (!timestamp) {
			timestamp = new Date().getTime()
		}
		return endOfDay(timestamp).getTime()
	},
	getEndOfWeek(timestamp: number) {
		return endOfWeek(timestamp).getTime()
	},
	getStartOfMonth(timestamp?: number) {
		if (!timestamp) {
			timestamp = new Date().getTime()
		}
		return startOfMonth(timestamp).getTime()
	},
	addMinutes(startTimestamp: number, minutes: number) {
		return addMinutes(startTimestamp, minutes).getTime()
	},
	addMilliseconds(startTimestamp: number, ms: number) {
		return addMilliseconds(startTimestamp, ms).getTime()
	},
	addDays(startTimestamp: number, days: number) {
		return addDays(startTimestamp, days).getTime()
	},
	addYears(startTimestamp: number, years: number) {
		return addYears(startTimestamp, years).getTime()
	},
	getDurationMs(startTimestamp: number, endTimestamp: number) {
		return endTimestamp - startTimestamp
	},
	getDurationMinutes(startTimestamp: number, endTimestamp: number) {
		const durationMs = this.getDurationMs(startTimestamp, endTimestamp)

		const durationSeconds = durationMs / 1000
		const durationMinutes = durationSeconds / 60

		return durationMinutes
	},
	getDurationDays(startTimestamp: number, endTimestamp: number) {
		const diff = endTimestamp - startTimestamp
		return Math.ceil(diff / (1000 * 3600 * 24))
	},
	getDayOfWeek(startTimestamp: number): DayOfWeek {
		return this.eventDaysOfWeek[getDay(startTimestamp)]
	},
	splitDate(startTimestamp: number) {
		const date = new Date(startTimestamp)
		return {
			year: date.getFullYear(),
			month: date.getMonth(),
			day: date.getDate(),
			hour: date.getUTCHours(),
			minute: date.getMinutes(),
		}
	},
	setTimeOfDay(startTimestamp: number, hours: number, minutes: number) {
		const date = new Date(startTimestamp)

		date.setHours(hours)
		date.setMinutes(minutes)

		return date.getTime()
	},
	getDateNDaysFromStartOfDay(days: number, timestamp?: number) {
		const startOfDay = this.getStartOfDay(timestamp)
		return addDays(startOfDay, days).getTime()
	},
	getDateNMonthsFromStartOfDay(count: number, timestamp?: number) {
		const startOfDay = this.getStartOfDay(timestamp)
		return addMonths(startOfDay, count).getTime()
	},
	getDateNMonthsFromStartOfMonth(count: number, timestamp?: number) {
		return addMonths(this.getStartOfMonth(timestamp), count).getTime()
	},
	date(date: IDate) {
		return Date.UTC(
			date.year,
			date.month,
			date.day,
			date.hour ?? 0,
			date.minute ?? 0
		)
	},

	applyRuleAndGetEvents(e: Event, dateUntil: number) {
		const events = this.applyRuleAndGetEventsWithoutExclusion(e, dateUntil)
		const excludedEvents = events.filter((e) => !this.isExcluded(e as any))

		return excludedEvents
	},
	applyRuleAndGetEventsWithoutExclusion(e: Event, dateUntil: number) {
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

			const events = dateUtil.filterEventRulesAndGetEvents(rule, e)

			return events
		}

		return [e]
	},
	filterEventRulesAndGetEvents(rule: RRule, event: Event) {
		const duration = dateUtil.getDurationMs(event.startDate, event.endDate)
		let events = rule.all().map((r) => ({
			...event,
			startDate: r.getTime(),
			endDate: dateUtil.addMilliseconds(r.getTime(), duration),
		})) as Event[]

		return events
	},
	isExcluded(e: Event) {
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

	getEventFromRangeByDate(values: Event, date: number) {
		const dateUntil = dateUtil.addYears(new Date().getTime(), 10)
		const searchDate = dateUtil.splitDate(date)
		const repeatingEvents = dateUtil.applyRuleAndGetEvents(
			values as any,
			dateUntil
		)
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

export default dateUtil

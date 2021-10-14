import { addWeeks, startOfDay } from 'date-fns'
import { startOfMonth } from 'date-fns'
import { addDays } from 'date-fns'
import { format as formatDate } from 'date-fns'
import { addMonths } from 'date-fns'
import { addYears } from 'date-fns'
import { endOfWeek } from 'date-fns'
import { addMilliseconds, endOfDay, getDay, startOfWeek } from 'date-fns'
import addMinutes from 'date-fns/addMinutes'
import { daysOfWeek } from '../constants'
import { DayOfWeek } from '../types/calendar.types'

export interface IDate {
	month: number
	day: number
	year: number
	hour?: number
	minute?: number
}

type DateUnit = 'days' | 'weeks' | 'months' | 'years' | 'minutes'

const dateUtil = {
	eventDaysOfWeek: daysOfWeek,
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
	addWeeks(startTimestamp: number, weeks: number) {
		return addWeeks(startTimestamp, weeks).getTime()
	},
	addMonths(startTimestamp: number, months: number) {
		return addMonths(startTimestamp, months).getTime()
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
		//@ts-ignore
		return Object.keys(daysOfWeek)[getDay(startTimestamp)]
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
	setTimeOfDay(
		startTimestamp: number,
		hours: number,
		minutes: number,
		seconds?: number,
		milliseconds?: number
	) {
		const date = new Date(startTimestamp)

		date.setHours(hours)
		date.setMinutes(minutes)
		if (typeof seconds == 'number') {
			date.setSeconds(seconds)
		}

		if (typeof milliseconds == 'number') {
			date.setMilliseconds(milliseconds)
		}

		return date.getTime()
	},
	getDateNDaysFromStartOfDay(days: number, timestamp?: number) {
		const startOfDay = this.getStartOfDay(timestamp)
		return addDays(startOfDay, days).getTime()
	},
	getDateNMonthsFromStartOfDay(count: number, timestamp?: number) {
		const startOfDay = this.getStartOfDay(timestamp)
		return this.addMonths(startOfDay, count)
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
	format(timestamp: number, format: string) {
		return formatDate(timestamp, format)
	},
	add(timestamp: number, count: number, unit: DateUnit) {
		return adders[unit](timestamp, count)
	},
}

export default dateUtil

const adders: Record<DateUnit, (timestamp: number, count: number) => number> = {
	years: dateUtil.addYears.bind(dateUtil),
	weeks: dateUtil.addWeeks.bind(dateUtil),
	days: dateUtil.addDays.bind(dateUtil),
	minutes: dateUtil.addMinutes.bind(dateUtil),
	months: dateUtil.addMonths.bind(dateUtil),
}

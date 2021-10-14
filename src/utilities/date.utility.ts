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

export type DateUnit = 'days' | 'weeks' | 'months' | 'years' | 'minutes'

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
	/**
	 * Unit_______________Pattern___Results
	 *
	 * Era________________G..GGG____AD,BC
	 *
	 * ___________________GGGG______Anno Domini, Before Christ
	 *
	 * ___________________GGGGG_____A,B
	 *
	 *
	 *
	 * Calendar year_______y_________44, 1, 1900, 2017
	 *
	 * ___________________yo________44th, 1st, 0th, 17th
	 *
	 * ___________________yy________44, 01, 00, 17
	 *
	 * ___________________yyy_______044, 001, 1900, 2017
	 *
	 * ___________________yyyy______0044, 0001, 1900, 2017
	 *
	 *
	 *
	 * Local week_________Y_________44, 1, 1900, 2017
	 *
	 * ___________________Yo________44th, 1st, 1900th, 2017th
	 *
	 * ___________________YY________44, 01, 00, 17
	 *
	 * ___________________YYY_______044, 001, 1900, 2017
	 *
	 * ___________________YYYY______0044, 0001, 1900, 2017
	 *
	 *
	 *
	 * ISO week___________R_________-43, 0, 1, 1900, 2017
	 *
	 * ___________________RR________-43, 00, 01, 1900, 2017
	 *
	 * ___________________RRR_______-043, 000, 001, 1900, 2017
	 *
	 * ___________________RRRR______-0043, 0000, 0001, 1900, 2017
	 *
	 * ___________________RRRRR_____...
	 *
	 *
	 *
	 * Extended year______u_________-43, 0, 1, 1900, 2017
	 *
	 * ___________________uu________-43, 01, 1900, 2017
	 *
	 * ___________________uuu_______-043, 001, 1900, 2017
	 *
	 * ___________________uuuu______-0043, 0001, 1900, 2017
	 *
	 * ___________________uuuuu_____...
	 *
	 *
	 *
	 * Quarter (pretty)_____Q_________1, 2, 3, 4
	 *
	 * ___________________Qo________1st, 2nd, 3rd, 4th
	 *
	 * ___________________QQ________01, 02, 03, 04
	 *
	 * ___________________QQQ_______Q1, Q2, Q3, Q4
	 *
	 * ___________________QQQQ______1st quarter, 2nd quarter, ...
	 *
	 * ___________________QQQQQ_____1, 2, 3, 4
	 *
	 *
	 *
	 * Quarter____________q_________1, 2, 3, 4
	 *
	 * ___________________qo________1st, 2nd, 3rd, 4th
	 *
	 * ___________________qq________01, 02, 03, 04
	 *
	 * ___________________qqq_______Q1, Q2, Q3, Q4
	 *
	 * ___________________qqqq______1st quarter, 2nd quarter,...
	 *
	 * ___________________qqqqq_____1, 2, 3, 4
	 *
	 *
	 *
	 * Month (pretty)______M_________1, 2, ..., 12
	 *
	 * ___________________Mo________1st, 2nd, ..., 12th
	 *
	 * ___________________MM________01, 02, ..., 12
	 *
	 * ___________________MMM_______Jan, Feb, ..., Dec
	 *
	 * ___________________MMMM______January, February, ..., December
	 *
	 * ___________________MMMMM_____J, F, ..., D
	 *
	 *
	 *
	 * Month______________L_________1, 2, ..., 12
	 *
	 * ___________________Lo________1st, 2nd, ..., 12th
	 *
	 * ___________________LL________01, 02, ..., 12
	 *
	 * ___________________LLL_______Jan, Feb, ..., Dec
	 *
	 * ___________________LLLL______January, February, ..., December
	 *
	 * ___________________LLLLL_____J, F, ..., D
	 *
	 *
	 *
	 * Local Week_________w_________1, 2, ..., 53
	 *
	 * ___________________wo________1st, 2nd, ..., 53th
	 *
	 * ___________________ww________01, 02, ..., 53
	 *
	 *
	 *
	 * ISO week of year_____I_________1, 2, ..., 53
	 *
	 * ___________________Io________1st, 2nd, ..., 53th
	 *
	 * ___________________II________01, 02, ..., 53
	 *
	 *
	 *
	 * Day of month_______d_________1, 2, ..., 31
	 *
	 * ___________________do________1st, 2nd, ..., 31st
	 *
	 * ___________________dd________01, 02, ..., 31
	 *
	 *
	 *
	 * Day of year________D_________1, 2, ..., 365, 366
	 *
	 * ___________________Do________1st, 2nd, ..., 365th, 366th
	 *
	 * ___________________DD________01, 02, ..., 365, 366
	 *
	 * ___________________DDD_______001, 002, ..., 365, 366
	 *
	 *
	 *
	 * Day of week________E..EEE____Mon, Tue, Wed, ..., Sun
	 *
	 * ___________________EEEE______Monday, Tuesday, ..., Sunday
	 *
	 * ___________________EEEEE_____M, T, W, T, F, S, S
	 *
	 * ___________________EEEEEE____Mo, Tu, We, Th, Fr, Sa, Su
	 *
	 *
	 *
	 * ISO day of week_____i_________1, 2, 3, ..., 7
	 *
	 * ___________________io________1st, 2nd, ..., 7th
	 *
	 * ___________________ii________01, 02, ..., 07
	 *
	 * ___________________iii_______Mon, Tue, Wed, ..., Sun
	 *
	 * ___________________iiii______Monday, Tuesday, ..., Sunday
	 *
	 * ___________________iiiii_____M, T, W, T, F, S, S
	 *
	 * ___________________iiiiii____Mo, Tu, We, Th, Fr, Sa, Su
	 *
	 *
	 *
	 * Local day of week_____e_________2, 3, 4, ..., 1
	 *
	 * ___________________eo________2nd, 3rd, ..., 1st
	 *
	 * ___________________ee________02, 03, ..., 01
	 *
	 * ___________________eee_______Mon, Tue, Wed, ..., Sun
	 *
	 * ___________________eeee______Monday, Tuesday, ..., Sunday
	 *
	 * ___________________eeeee_____M, T, W, T, F, S, S
	 *
	 * ___________________eeeeee____Mo, Tu, We, Th, Fr, Sa, Su
	 *
	 *
	 *
	 *
	 * Day of week_________c_________2, 3, 4, ..., 1
	 *
	 * ___________________co________2nd, 3rd, ..., 1st
	 *
	 * ___________________cc________02, 03, ..., 01
	 *
	 * ___________________ccc_______Mon, Tue, Wed, ..., Sun
	 *
	 * ___________________cccc______Monday, Tuesday, ..., Sunday
	 *
	 * ___________________ccccc_____M, T, W, T, F, S, S
	 *
	 * ___________________cccccc____Mo, Tu, We, Th, Fr, Sa, Su
	 *
	 *
	 *
	 * AM,PM_____________a..aa_____AM, PM
	 *
	 * ___________________aaa_______am, pm
	 *
	 * ___________________aaaa______a.m., p.m.
	 *
	 * ___________________aaaaa_____a,p
	 *
	 *
	 *
	 * AM, PM, noon_______b..bb_____AM, PM, noon, midnight
	 *
	 * ___________________bbb_______am, pm, noon, m
	 */
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

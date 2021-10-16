import { addWeeks, startOfDay } from 'date-fns'
import { startOfMonth } from 'date-fns'
import { addDays } from 'date-fns'
import { format as formatDate } from 'date-fns'
import { addMonths } from 'date-fns'
import { addYears } from 'date-fns'
import { endOfWeek } from 'date-fns'
import {
	addMilliseconds,
	endOfDay,
	getDay,
	startOfWeek,
	addMinutes,
} from 'date-fns'
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
	 * ___________________________RR________-43, 00, 01, 1900, 2017
	 *
	 * __________________________RRR_______-043, 000, 001, 1900, 2017
	 *
	 * _________________________RRRR______-0043, 0000, 0001, 1900, 2017
	 *
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
	 * AM, PM, noon, mid_b..bb____AM, PM, noon, midnight
	 *
	 * _____________________bbb______am, pm, noon, midnight
	 *
	 * _____________________bbbb_____a.m.,_p.m.,_noon,_midnight
	 *
	 * _____________________bbbbb____a,_p,_n,_mi
	 *
	 *
	 * Flexible day period_B..BBB___at night, in the morning, ...
	 *
	 * _____________________BBBB_____at night, in the morning, ...
	 *
	 * _____________________BBBBB____at night, in the morning, ...
	 *
	 *
	 *
	 * Hour [1-12]_________h________1, 2, ..., 11, 12
	 *
	 * ___________________ho_______1st, 2nd, ..., 11th, 12th
	 *
	 * ___________________hh_______01,_02,_...,_11,_12
	 *
	 *
	 *
	 * Hour [0-23]______________H________0,_1,_2,_...,_23
	 *
	 * __________________________Ho_______0th,_1st,_2nd,_...,_23rd
	 *
	 * __________________________HH_______00,_01,_02,_...,_23
	 *
	 *
	 *
	 * Hour [0-11]______________K________1,_2,_...,_11,
	 *
	 * __________________________Ko_______1st,_2nd,_...,_11th,_0th
	 *
	 * __________________________KK_______01,_02,_...,_11,_00
	 *
	 *
	 *
	 * Hour [1-24]______________k________24,_1,_2,_...,_23
	 *
	 * __________________________ko_______24th,_1st,_2nd,_...,_23rd
	 *
	 * __________________________kk_______24,_01,_02,_...,_23
	 *
	 *
	 *
	 * Minute___________________m__________0,_1,_...,_59
	 *
	 * ___________________________mo_________0th,_1st,_...,_59th
	 *
	 * ___________________________mm_________00,_01,_...,_59
	 *
	 *
	 *
	 * Second___________________s__________0,_1,_...,_59
	 *
	 * ___________________________so_________0th,_1st,_...,_59th
	 *
	 * ___________________________ss_________00,_01,_...,_59
	 *
	 *
	 *
	 * Fraction_of_second_______S__________0,_1,_...,
	 *
	 * ___________________________SS_________00,_01,_...,_99
	 *
	 * ___________________________SSS________000,_001,_...,_999
	 *
	 *
	 *
	 * Timezone_(ISO-8601_w/_Z)_X__________-08,_+0530,_Z
	 *
	 * ___________________________XX_________-0800,_+0530,_Z
	 *
	 * ___________________________XXX________-08:00,_+05:30,_Z
	 *
	 * ___________________________XXXX_______-0800,_+0530,_Z,_+123456
	 *
	 * ___________________________XXXXX______-08:00,_+05:30,_Z,_+12:34:56
	 *
	 *
	 *
	 * Timezone_(ISO-8601_w/o_Z_x__________-08,_+0530,_+00
	 *
	 * ___________________________xx_________-0800,_+0530,_+0000
	 *
	 * ___________________________xxx________-08:00,_+05:30,_+00:00
	 *
	 * ___________________________xxxx_______-0800,_+0530,_+0000,_+123456
	 *
	 * ___________________________xxxxx______-08:00,_+05:30,_+00:00,_+12:34:56
	 *
	 *
	 * Timezone_(GMT)___________O...OOO____GMT-8,_GMT+5:30,_GMT+0
	 *
	 * ___________________________OOOO_______GMT-08:00,_GMT+05:30,_GMT+00:00
	 *
	 *
	 * Timezone_(specific_non-l_z...zzz____GMT-8,_GMT+5:30,_GMT+0
	 *
	 * ___________________________zzzz_______GMT-08:00,_GMT+05:30,_GMT+00:00
	 *
	 *
	 * Seconds_timestamp________t__________512969520
	 *
	 *
	 * Milliseconds_timestamp___T__________512969520900
	 *
	 *
	 * Long localized date______P__________04/29/1453
	 *
	 * ___________________________PP_________Apr 29, 1453
	 *
	 * ___________________________PPP________April 29th, 1453
	 *
	 * ___________________________PPPP_______Friday,_April_29th,_1453
	 *
	 *
	 * Long_localized_time______p__________12:00_AM
	 *
	 * ___________________________pp_________12:00:00_AM
	 *
	 * ___________________________ppp________12:00:00_AM_GMT+2
	 *
	 * ___________________________pppp_______12:00:00_AM_GMT+02:00
	 *
	 *
	 *
	 * Date & Time_______________Pp_________04/29/1453,_12:00_AM
	 *
	 * ___________________________PPpp_______Apr_29,_1453,_12:00:00_AM
	 *
	 * ___________________________PPPppp_____April_29th,_1453_at_...
	 *
	 * ___________________________PPPPpppp___Friday,_April_29th,_1453_at_...
	 *
	 */
	format(timestamp: number, format: string) {
		return formatDate(timestamp, format)
	},
	add(timestamp: number, count: number, unit: DateUnit) {
		return adders[unit](timestamp, count)
	},
	isSameDay(timestamp1: number, timestamp2: number) {
		const { day, year, month } = this.splitDate(timestamp1)
		const { day: day2, year: year2, month: month2 } = this.splitDate(timestamp2)

		return day === day2 && year === year2 && month === month2
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

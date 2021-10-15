import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import dateUtil from '../../utilities/date.utility'

export default class DateUtilityTest extends AbstractSpruceTest {
	@test()
	protected static canCreateDateUtility() {
		assert.isTruthy(dateUtil)
	}

	@test()
	protected static constructsDateInUtcForTomorrow() {
		const date = new Date()

		const tomorrowMillis = date.getTime() + 24 * 60 * 60 * 1000
		const tomorrowDate = new Date(tomorrowMillis)
		const expected = tomorrowDate.getTime()
		const actual = dateUtil.addDays(new Date().getTime(), 1)

		assert.isEqual(this.stripSeconds(expected), this.stripSeconds(actual))
	}

	@test('jan 1 2021 11:59pm is fri', 1609545540000, 'fri')
	@test('feb 28 2020 11:59pm is fri', 1582934340000, 'fri')
	@test('dec 31 2020 11:59pm is thur', 1609459140000, 'thur')
	@test('jan 1 2020 12:00am is wed', 1577836800000, 'wed')
	@test('june 1 2021 12:00am is tue', 1622505600000, 'tue')
	@test('oct 26 2020 12:00am is mon', 1603670400000, 'mon')
	protected static getsRightDayOfWeek(millis: number, expected: string) {
		const dow = dateUtil.getDayOfWeek(millis)

		assert.isEqual(dow, expected)
	}

	@test(
		'build date to minutes',
		{ month: 0, day: 1, year: 2020, hour: 9, minute: 30 },
		1577871000000
	)
	@test('build date to year', { month: 0, day: 1, year: 2020 }, 1577836800000)
	@test(
		'build date to hours',
		{ month: 0, day: 1, year: 2020, hour: 9 },
		1577869200000
	)
	@test(
		'build date to month',
		{ month: 9, day: 26, year: 2020, hour: 0 },
		1603670400000
	)
	@test(
		'build date to day',
		{ month: 9, day: 27, year: 2020, hour: 0 },
		1603756800000
	)
	protected static canBuildDates(date: any, expected: number) {
		const results = dateUtil.date(date)
		assert.isEqual(results, expected)
	}

	@test(
		'Wednesday 01-01-2020 00:00 -> Sunday 12-29-2019 00:00 GMT',
		{ month: 0, day: 1, year: 2020, hour: 0, minute: 0 },
		1577577600000
	)
	@test(
		'Wednesday 01-01-2020 23:59 -> Sunday 12-29-2019 00:00 GMT',
		{ month: 0, day: 1, year: 2020, hour: 23, minute: 59 },
		1577577600000
	)
	@test(
		'Tuesday 01-07-2020 00:00 -> Sunday 01-05-2020 00:00 GMT',
		{ month: 0, day: 7, year: 2020, hour: 0, minute: 0 },
		1578182400000
	)
	@test(
		'Tuesday 01-07-2020 23:59 -> Sunday 01-05-2020 00:00 GMT',
		{ month: 0, day: 7, year: 2020, hour: 23, minute: 59 },
		1578182400000
	)
	@test(
		'Saturday 01-11-2020 00:00 -> Sunday 01-05-2020 00:00 GMT',
		{ month: 0, day: 11, year: 2020, hour: 0, minute: 0 },
		1578182400000
	)
	@test(
		'Saturday 01-11-2020 23:59 -> Sunday 01-05-2020 00:00 GMT',
		{ month: 0, day: 11, year: 2020, hour: 23, minute: 59 },
		1578182400000
	)
	@test(
		'Sunday 01-12-2020 00:00 -> Sunday 01-12-2020 00:00 GMT',
		{ month: 0, day: 12, year: 2020, hour: 0, minute: 0 },
		1578787200000
	)
	@test(
		'Sunday 01-12-2020 23:59 -> Sunday 01-12-2020 00:00 GMT',
		{ month: 0, day: 12, year: 2020, hour: 23, minute: 59 },
		1578787200000
	)
	@test(
		'Monday 01-13-2020 00:00 -> Sunday 01-12-2020 00:00 GMT',
		{ month: 0, day: 13, year: 2020, hour: 0, minute: 0 },
		1578787200000
	)
	@test(
		'Monday 01-13-2020 23:59 -> Sunday 01-12-2020 00:00 GMT',
		{ month: 0, day: 13, year: 2020, hour: 23, minute: 59 },
		1578787200000
	)
	protected static startOfWeekReturnsSunday(date: any, expected: number) {
		const startOfWeek = dateUtil.getStartOfWeek(
			Date.UTC(
				date.year,
				date.month,
				date.day,
				date.hour ?? 0,
				date.minute ?? 0
			)
		)

		assert.isEqual(startOfWeek, expected)
	}

	@test(
		'Friday, January 1, 2021 03:34:00 AM -> Friday, January 1, 2021 00:00:00 AM',
		{ month: 0, day: 1, year: 2021, hour: 3, minute: 34 },
		1609459200000
	)
	@test(
		'Friday, January 1, 2021 11:34:00 PM -> Friday, January 1, 2021 00:00:00 AM',
		{ month: 0, day: 1, year: 2021, hour: 23, minute: 34 },
		1609459200000
	)
	@test(
		'Friday, January 1, 2021 01:34:00 AM -> Friday, January 1, 2021 00:00:00 AM',
		{ month: 0, day: 1, year: 2021, hour: 1, minute: 34 },
		1609459200000
	)
	@test(
		'Monday,October 26, 2020 3:23:00 AM -> Monday,October 26, 2020 12:00:00 AM',
		{ month: 9, day: 26, year: 2020, hour: 3, minute: 23 },
		1603670400000
	)
	protected static getsStartOfDay(date: any, expected: number) {
		const startOfDay = dateUtil.getStartOfDay(
			Date.UTC(
				date.year,
				date.month,
				date.day,
				date.hour ?? 0,
				date.minute ?? 0
			)
		)
		assert.isEqual(startOfDay, expected)
	}

	@test(
		'Friday, January 1, 2021 03:34:00 AM -> Friday, January 1, 2021 11:59:59 PM',
		{ month: 0, day: 1, year: 2021, hour: 3, minute: 34 },
		1609545599999
	)
	@test(
		'Friday, January 1, 2021 11:34:00 PM -> Friday, January 1, 2021 11:59:59 PM',
		{ month: 0, day: 1, year: 2021, hour: 23, minute: 34 },
		1609545599999
	)
	@test(
		' Friday, January 1, 2021 00:00:00 AM -> Friday, January 1, 2021 11:59:59 PM',
		{ month: 0, day: 1, year: 2021, hour: 0, minute: 0 },
		1609545599999
	)
	@test(
		'Monday,October 26, 2020 3:23:00 AM -> Monday,October 26, 2020 11:59:59 PM',
		{ month: 9, day: 26, year: 2020, hour: 3, minute: 23 },
		1603756799999
	)
	protected static getRightEndOfDay(date: any, expected: number) {
		const startOfDay = dateUtil.getEndOfDay(
			Date.UTC(
				date.year,
				date.month,
				date.day,
				date.hour ?? 0,
				date.minute ?? 0
			)
		)
		assert.isEqual(startOfDay, expected)
	}

	@test(
		'December 31, 2020 11:59:00 PM -> Thursday, December 1, 2020 12:00:00 AM',
		{ month: 11, day: 31, year: 2020, hour: 23, minute: 59 },
		1606780800000
	)
	@test(
		'Thursday, December 1, 2020 12:00:00am -> Thursday, December 1, 2020 12:00:00 AM',
		{ month: 11, day: 1, year: 2020, hour: 0, minute: 0 },
		1606780800000
	)
	@test(
		'Monday, October 26, 2020 3:23:00 AM -> Monday,October 1, 2020 12:00:00 AM',
		{ month: 9, day: 26, year: 2020, hour: 3, minute: 23 },
		1601510400000
	)
	protected static getRightStartOfMonth(date: any, expected: number) {
		const startOfDay = dateUtil.getStartOfMonth(
			Date.UTC(
				date.year,
				date.month,
				date.day,
				date.hour ?? 0,
				date.minute ?? 0
			)
		)
		assert.isEqual(startOfDay, expected)
	}
	@test(
		'Thursday,January 1, 2020 12:00:00 AM',
		{ month: 0, day: 1, year: 2020, hour: 0, minute: 0 },
		10,
		1578700800000
	)
	@test(
		'Thursday, December 1, 2020 12:00:00 AM',
		{ month: 11, day: 1, year: 2020, hour: 0, minute: 0 },
		183,
		1622592000000
	)
	protected static getRightNDaysFromStartOfDay(
		date: any,
		days: number,
		expected: number
	) {
		const startOfDay = dateUtil.getDateNDaysFromStartOfDay(
			days,
			Date.UTC(
				date.year,
				date.month,
				date.day,
				date.hour ?? 0,
				date.minute ?? 0
			)
		)
		assert.isEqual(startOfDay, expected)
	}

	@test(
		'Wednesday, January 1, 2020 3:00:00 AM',
		{ month: 0, day: 1, year: 2020, hour: 2, minute: 30 },
		30,
		1577847600000
	)
	@test(
		'Monday,October 26, 2020 12:00:00 AM',
		{ month: 9, day: 26, year: 2020, hour: 0, minute: 0 },
		365 * 24 * 60,
		1635206400000
	)
	protected static addMinutesReturnsRightTimestamp(
		date: any,
		minutes: number,
		expected: number
	) {
		const timestamp = Date.UTC(
			date.year,
			date.month,
			date.day,
			date.hour ?? 0,
			date.minute ?? 0
		)
		const actual = dateUtil.addMinutes(timestamp, minutes)
		assert.isEqual(actual, expected)

		const actual2 = dateUtil.add(timestamp, minutes, 'minutes')
		assert.isEqual(actual2, expected)
	}

	@test(
		'Wednesday, January 1, 2020 11:30:00 PM',
		{ month: 0, day: 1, year: 2020, hour: 23, minute: 0, ms: 0 },
		1800000,
		1577921400000
	)
	@test(
		'Monday,October 26, 2020 12:00:00 AM',
		{ month: 9, day: 26, year: 2020, hour: 0, minute: 0 },
		365 * 24 * 60 * 60 * 1000,
		1635206400000
	)
	protected static addMillisecondsReturnsRightTimestamp(
		date: any,
		ms: number,
		expected: number
	) {
		const result = dateUtil.addMilliseconds(
			Date.UTC(
				date.year,
				date.month,
				date.day,
				date.hour ?? 0,
				date.minute ?? 0,
				date.seconds ?? 0,
				date.ms ?? 0
			),
			ms
		)
		assert.isEqual(result, expected)
	}

	@test(
		'Wednesday, January 11, 2020 11:00:00 PM',
		{ month: 0, day: 1, year: 2020, hour: 23, minute: 0 },
		10,
		1578783600000
	)
	@test(
		'Monday,October 26, 2020 12:00:00 AM',
		{ month: 9, day: 1, year: 2020, hour: 0, minute: 0 },
		25,
		1603670400000
	)
	protected static addDayReturnsRightTimestamp(
		date: any,
		days: number,
		expected: number
	) {
		const timestamp = new Date(
			date.year,
			date.month,
			date.day,
			date.hour ?? 0,
			date.minute ?? 0,
			date.seconds ?? 0
		).getTime()

		const actual = dateUtil.addDays(timestamp, days)
		assert.isEqual(actual, expected)

		const actual2 = dateUtil.add(timestamp, days, 'days')
		assert.isEqual(actual2, expected)
	}

	@test(
		'Wednesday, January 11, 2025 11:00:00 PM',
		{ month: 0, day: 11, year: 2020, hour: 23, minute: 0 },
		5,
		1736636400000
	)
	@test(
		'Monday, March 9, 2020 12:00:00 AM',
		{ month: 2, day: 9, year: 2020, hour: 0, minute: 0 },
		1,
		1615248000000
	)
	@test(
		'Monday, October 26, 2020 12:00:00 AM',
		{ month: 9, day: 26, year: 2020, hour: 0, minute: 0 },
		1,
		1635206400000
	)
	protected static addingYears(date: any, years: number, expected: number) {
		const timestamp = new Date(
			date.year,
			date.month,
			date.day,
			date.hour ?? 0,
			date.minute ?? 0,
			date.seconds ?? 0
		).getTime()
		const actual = dateUtil.addYears(timestamp, years)
		assert.isEqual(actual, expected)

		const actual2 = dateUtil.add(timestamp, years, 'years')
		assert.isEqual(actual2, expected)
	}

	@test(
		'Wednesday, January 11, 2025 11:00:00 PM',
		{ month: 0, day: 11, year: 2020, hour: 23, minute: 0 },
		{ month: 0, day: 12, year: 2020, hour: 1, minute: 0 },
		120
	)
	protected static getDurationInMinutesReturnsRightTimestamp(
		start: any,
		end: any,
		expected: number
	) {
		const startDate = new Date(
			start.year,
			start.month,
			start.day,
			start.hour ?? 0,
			start.minute ?? 0,
			start.seconds ?? 0
		).getTime()
		const endDate = new Date(
			end.year,
			end.month,
			end.day,
			end.hour ?? 0,
			end.minute ?? 0,
			end.seconds ?? 0
		).getTime()
		const result = dateUtil.getDurationMinutes(startDate, endDate)

		assert.isEqual(result, expected)
	}

	@test(
		'Wednesday, January 11, 2025 11:00:00 PM',
		{ month: 0, day: 11, year: 2020, hour: 23, minute: 0 },
		{ month: 0, day: 14, year: 2020, hour: 1, minute: 0 },
		3
	)
	@test(
		'February 27, 2020 12:00:00 AM',
		{ month: 1, day: 27, year: 2020, hour: 0, minute: 0 },
		{ month: 2, day: 1, year: 2020, hour: 0, minute: 0 },
		3
	)
	protected static getDurationInDaysReturnsRightTimestamp(
		start: any,
		end: any,
		expected: number
	) {
		const startDate = new Date(
			start.year,
			start.month,
			start.day,
			start.hour ?? 0,
			start.minute ?? 0,
			start.seconds ?? 0
		).getTime()
		const endDate = new Date(
			end.year,
			end.month,
			end.day,
			end.hour ?? 0,
			end.minute ?? 0,
			end.seconds ?? 0
		).getTime()
		const result = dateUtil.getDurationDays(startDate, endDate)

		assert.isEqual(result, expected)
	}

	@test(
		'Wednesday, January 11, 2020 10:00:00 PM',
		{ month: 0, day: 11, year: 2020, hour: 10, minute: 30 },
		20,
		30,
		1578774600000
	)
	@test(
		'Sunday, April 12, 2020 12:00:00 AM',
		{ month: 3, day: 12, year: 2020, hour: 23, minute: 59 },
		0,
		0,
		1586649600000
	)
	protected static setTimeOfDayReturnsRightTimestamp(
		start: any,
		hour: number,
		minute: number,
		expected: number
	) {
		const result = dateUtil.setTimeOfDay(
			new Date(
				start.year,
				start.month,
				start.day,
				start.hour ?? 0,
				start.minute ?? 0,
				start.seconds ?? 0
			).getTime(),
			hour,
			minute
		)

		assert.isEqual(result, expected)
	}

	@test(
		'Thursday, December 1, 2020 12:00:00 AM',
		{ month: 11, day: 1, year: 2020, hour: 0, minute: 0 },
		6,
		1622505600000
	)
	@test(
		'Monday, October 26, 2020 12:00:00 AM',
		{ month: 4, day: 26, year: 2020, hour: 0, minute: 0 },
		5,
		1603670400000
	)
	protected static getRightDateNMonthsFromStartOfDay(
		date: any,
		count: number,
		expected: number
	) {
		const result = dateUtil.getDateNMonthsFromStartOfDay(
			count,
			Date.UTC(
				date.year,
				date.month,
				date.day,
				date.hour ?? 0,
				date.minute ?? 0
			)
		)
		assert.isEqual(result, expected)
	}

	@test(
		'Wednesday, September 15, 2021 9:30:00.000 AM',
		1631669408000,
		{ hour: 9, minute: 30, seconds: 0, milliseconds: 0 },
		1631698200000
	)
	@test(
		'Wednesday, September 15, 2021 9:30:00.001 AM',
		1631669408000,
		{ hour: 9, minute: 30, seconds: 0, milliseconds: 1 },
		1631698200001
	)
	@test(
		'Wednesday, September 15, 2021 9:30:06.001 AM',
		1631669408000,
		{ hour: 9, minute: 30, seconds: 6, milliseconds: 1 },
		1631698206001
	)
	@test(
		'Friday, September 17, 2021 6:00:30 PM',
		1631901630000,
		{ hour: 18, minute: 0, seconds: 30, milliseconds: 1 },
		1631901630001
	)
	@test(
		'Friday, September 17, 2021 6:00:30 AM',
		1631858430000,
		{ hour: 6, minute: 0, seconds: 30, milliseconds: 1 },
		1631858430001
	)
	@test(
		'Friday, September 17, 2021 11:00:30 PM',
		1631840430000,
		{ hour: 23, minute: 0, seconds: 30, milliseconds: 1 },
		1631919630001
	)
	@test(
		'Friday, September 17, 2021 1:00:30 AM',
		1631923199000,
		{ hour: 1, minute: 0, seconds: 30, milliseconds: 1 },
		1631840430001
	)
	protected static canSetTimeOfDayWithSecondsAndMilliseconds(
		timestamp: number,
		time: any,
		expectedTimeStamp: number
	) {
		const result = dateUtil.setTimeOfDay(
			timestamp,
			time.hour,
			time.minute,
			time.seconds,
			time.milliseconds
		)
		assert.isEqual(result, expectedTimeStamp)
	}

	@test('can add 1 week', 1, 1609484400000, 1610089200000)
	@test('can add 2 weeks', 2, 1609484400000, 1610694000000)
	protected static canAddWeeks(weeks: number, start: number, expected: number) {
		const actual = dateUtil.addWeeks(start, weeks)
		assert.isEqual(actual, expected)

		const actual2 = dateUtil.add(start, weeks, 'weeks')
		assert.isEqual(actual2, expected)
	}

	@test('can add 1 month', 1, 441788400000, 444466800000)
	@test('can add 2 month', 2, 444466800000, 449650800000)
	protected static canAddMonths(
		months: number,
		start: number,
		expected: number
	) {
		const actual = dateUtil.addMonths(start, months)
		assert.isEqual(actual, expected)

		const actual2 = dateUtil.add(start, months, 'months')
		assert.isEqual(actual2, expected)
	}

	@test('date format 1', 444121200000, 'yyyy-MM-d', '1984-01-28')
	@test('date format 2', 458632800000, 'yyyy-MM-d', '1984-07-14')
	@test('date format 3', 458632800000, 'yyyy', '1984')
	@test('date format 4', 458632800000, 'M', '7')
	protected static canFormatDate(
		start: number,
		format: string,
		expected: string
	) {
		const actual = dateUtil.format(start, format)
		assert.isEqual(actual, expected)
	}

	@test('is not same day 1', 631177200000, 631263600000, false)
	@test('is same day 1', 655574400000, 655575120000, true)
	@test('is not same day if different year', 655574400000, 687111120000, false)
	@test('is not same day if different month', 663527520000, 689793120000, false)
	protected static canCheckSameDay(
		date1: number,
		date2: number,
		isSame: boolean
	) {
		const isSameDay = dateUtil.isSameDay(date1, date2)
		assert.isTrue(isSameDay === isSame)
	}

	private static stripSeconds(number: number): string {
		const str = `${number}`
		return str.slice(0, -4)
	}
}

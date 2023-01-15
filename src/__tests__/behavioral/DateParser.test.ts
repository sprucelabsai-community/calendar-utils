import AbstractSpruceTest, {
	test,
	assert,
	errorAssert,
} from '@sprucelabs/test-utils'
import LocaleImpl from '../../locales/Locale'
import DateParser from '../../parsing/DateParser'
import dateUtil, { IDate } from '../../utilities/date.utility'

export default class DateParserTest extends AbstractSpruceTest {
	private static parser: DateParser
	private static locale: LocaleImpl
	private static readonly startOf2020 = {
		year: 2020,
		month: 0,
		day: 1,
		hour: 0,
		minute: 0,
	}

	protected static async beforeEach() {
		await super.beforeEach()
		this.locale = new LocaleImpl()
		this.locale.setTimezoneOffsetMinutes(0)
		this.reloadParser(() => this.normalizeDate(now(), { hour: 0 }))
	}

	@test()
	protected static async throwsWhenMissingNow() {
		//@ts-ignore
		const err = assert.doesThrow(() => DateParser.Parser())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['now', 'locale'],
		})
	}

	@test()
	protected static async canCreateDateParser() {
		assert.isTrue(this.parser instanceof DateParser)
	}

	@test()
	protected static async returnsNowForNow() {
		this.reloadParser(() => new Date().getTime())
		this.assertParsedIsEqualTo('now', now())
	}

	@test('parses time 11 as 11:00am', '11', { hour: 11, minute: 0 })
	@test('parses time 1 as 1:00am', '1', { hour: 1, minute: 0 })
	@test('parses time 2 as 2:00am', '2', { hour: 2, minute: 0 })
	@test('parses time 5 as 5:00am', '5', { hour: 5, minute: 0 })
	@test('parses time 5pm as 5:00pm', '5pm', { hour: 17, minute: 0 })
	@test('parses time 5 pm as 5:00pm', '5 pm', { hour: 17, minute: 0 })
	protected static async parsesTimeForward(
		str: string,
		options: Partial<IDate>
	) {
		this.assertParsedEquals(str, options)
	}

	@test()
	protected static async parsesTimeAfterNow() {
		DateParserTest.reloadWithNow({ hour: 13 })
		this.assertParsedEquals('11', { hour: 23, minute: 0 })
	}

	@test('parses time with minutes 11:30 as 11:30am', '11:30', {
		hour: 11,
		minute: 30,
	})
	@test('parses time with minutes 2:45 as 2:45am', '2:45', {
		hour: 2,
		minute: 45,
	})
	@test(
		'parses time with minutes when not end of string',
		'i think 2:45pm or whatever',
		{
			hour: 14,
			minute: 45,
		}
	)
	protected static async canParseMinutesInTime(str: string, options: IDate) {
		this.assertParsedEquals(str, options)
	}

	@test()
	protected static async parsesMinutesAfterNow() {
		this.reloadWithNow({ hour: 10 })
		this.assertParsedEquals('9:23', { hour: 21, minute: 23 })
	}

	@test()
	protected static async parsesYear() {
		this.reloadWithNow({ year: 2020 })
		this.assertParsedEquals('2021', { year: 2021 })
	}

	@test('parses day of week in Jan 2020 - Monday', 'Monday', { day: 6 })
	@test('parses day of week in Jan 2020 - tuesday', 'tuesday', { day: 7 })
	@test('parses day of week in Jan 2020 - Sunday', 'Sunday', { day: 5 })
	protected static async parsesDayOfWeek(str: string, options: Partial<IDate>) {
		this.reloadWithNow({ day: 1, month: 0, year: 2020 })
		this.assertParsedEquals(str, { month: 0, year: 2020, ...options })
	}

	@test('parses day of week in March 2020 - Monday', 'Monday', { day: 2 })
	@test('parses day of week in March 2020 - Wednesday', 'Wednesday', {
		day: 4,
	})
	@test('parses day of week in March 2020 - Thursday', 'Thursday', {
		day: 5,
	})
	@test('parses day of week in March 2020 - Friday', 'Friday', {
		day: 6,
	})
	@test('parses day of week in March 2020 - Saturday', 'Saturday', {
		day: 7,
	})
	@test('parses day of week in March 2020 - Sunday', 'Sunday', {
		day: 1,
	})
	protected static async parsesDayOfWeekInDifferentMonth(
		str: string,
		options: Partial<IDate>
	) {
		this.reloadWithNow({ day: 1, month: 2, year: 2020 })
		this.assertParsedEquals(str, { month: 2, year: 2020, ...options })
	}

	@test('parses month Feb 1', 'Feb 1', { month: 1, day: 1 })
	@test('parses month Feb 10', 'Feb 10', { month: 1, day: 10 })
	@test('parses month Jan 2', 'Jan 2', { month: 0, day: 2 })
	@test('parses month Mar 10', 'Mar 10', { month: 2, day: 10 })
	@test('parses month Apr 12', 'Apr 12', { month: 3, day: 12 })
	@test('parses month May 15', 'May 15', { month: 4, day: 15 })
	@test('parses month Jun 20', 'Jun 20', { month: 5, day: 20 })
	@test('parses month Jul 20', 'Jul 20', { month: 6, day: 20 })
	@test('parses month Aug 25', 'Aug 25', { month: 7, day: 25 })
	@test('parses month Sep 3', 'Sep 3', { month: 8, day: 3 })
	@test('parses month Oct 3', 'Oct 3', { month: 9, day: 3 })
	@test('parses month Nov 3', 'Nov 3', { month: 10, day: 3 })
	@test('parses month Dec 3', 'Dec 3', { month: 11, day: 3 })
	protected static async parsesMonthAndDay(
		str: string,
		options: Partial<IDate>
	) {
		this.reloadParser(() =>
			this.normalizeDate(now(), { year: 2020, month: 0, day: 1 })
		)
		this.assertParsedEquals(str, { year: 2020, ...options })
		this.assertParsedEquals(str.toLocaleLowerCase(), { year: 2020, ...options })
	}

	@test('January 10 equals Jan 10', 'January 1', 'Jan 1')
	@test('February 1 equals Feb 1', 'February 1', 'Feb 1')
	@test('March 10 equals Mar 10', 'March 1', 'Mar 1')
	@test('April 12 equals Apr 12', 'April 1', 'Apr 1')
	@test('May 15 equals May 15', 'May 15', 'May 15')
	@test('June 20 equals Jun 20', 'June 20', 'Jun 20')
	@test('July 20 equals Jul 20', 'July 20', 'Jul 20')
	@test('August 25 equals Aug 25', 'August 25', 'Aug 25')
	@test('September 3 equals Sep 3', 'September 3', 'Sep 3')
	@test('October 3 equals Oct 3', 'October 3', 'Oct 3')
	@test('November 3 equals Nov 3', 'November 3', 'Nov 3')
	@test('December 3 equals Dec 3', 'December 3', 'Dec 3')
	@test('Jan. 10 equals Jan 10', 'Jan. 10', 'Jan 10')
	@test('Feb. 1 equals Feb 1', 'Feb. 1', 'Feb 1')
	@test('Mar. 10 equals Mar 10', 'Mar. 10', 'Mar 10')
	@test('Apr. 12 equals Apr 12', 'Apr. 12', 'Apr 12')
	@test('May. 15 equals May 15', 'May. 15', 'May 15')
	@test('Jun. 20 equals Jun 20', 'Jun. 20', 'Jun 20')
	@test('Jul. 20 equals Jul 20', 'Jul. 20', 'Jul 20')
	@test('Aug. 25 equals Aug 25', 'Aug. 25', 'Aug 25')
	@test('Sep. 3 equals Sep 3', 'Sep. 3', 'Sep 3')
	@test('Oct. 3 equals Oct 3', 'Oct. 3', 'Oct 3')
	@test('Nov. 3 equals Nov 3', 'Nov. 3', 'Nov 3')
	@test('Dec. 3 equals Dec 3', 'Dec. 3', 'Dec 3')
	protected static async monthParserHandlesMonthInDifferentForms(
		str1: string,
		str2: string
	) {
		this.assertParsedMatch(str2, str1)
	}

	@test('Jan 2nd equals Jan 2', 'Jan 2nd', 'Jan 2')
	protected static async canParsDayOfMonthWithOrdinal(
		str1: string,
		str2: string
	) {
		const expected = this.parse(str2)
		const actual = this.parse(str1)
		assert.isEqualDeep(actual, expected)
	}

	@test('can parse tomorrow without time', 'tomorrow')
	@test('can parse tomorrow 11', 'tomorrow 11', { hour: 11, minute: 0 })
	@test('can parse tomorrow 12:15am', 'tomorrow 12:15am', {
		hour: 0,
		minute: 15,
	})
	@test('tomorrow 5:20pm', 'tomorrow 5:20pm', {
		hour: 17,
		minute: 20,
	})
	protected static async canParseTomorrow(
		str: string,
		options?: Partial<IDate>
	) {
		this.reloadWithNow()
		this.assertParsedIsEqualTo(str, this.normalizeDate(tomorrow(), options))
	}

	@test()
	protected static async parsesYears() {
		this.reloadWithNow({ year: 2020 })
		this.assertParsedEquals('2020', { year: 2020 })
	}

	@test('can parse date and time Jan 1st 4pm', 'Jan 1st 4pm', {
		day: 1,
	})
	@test('can parse date and time Jan 2nd 4pm', 'Jan 2nd 4pm', {
		day: 2,
	})
	@test('can parse date and time Jan 3rd 4pm', 'Jan 3rd 4pm', {
		day: 3,
	})
	@test('can parse date and time Jan 4th 4pm', 'Jan 4th 4pm', {
		day: 4,
	})
	protected static canParseDateAndTime(str: string, options: Partial<IDate>) {
		this.reloadWithNow({ year: 2020, month: 0, day: 1, hour: 0, minute: 0 })
		this.assertParsedEquals(str, {
			year: 2020,
			hour: 16,
			month: 0,
			minute: 0,
			...options,
		})
	}

	@test(
		'can parse date and time with year Jan 1st 4pm 2020',
		'Jan 1st 4pm 2020',
		{
			hour: 16,
		}
	)
	@test('can parse date and time with year Feb. 4 11 1999', 'Feb. 4 11 1999', {
		year: 1999,
		month: 1,
		hour: 11,
		day: 4,
	})
	protected static async canParseDateAndTimeWithYear(
		str: string,
		options: Partial<IDate>
	) {
		this.reloadAsJan12020()
		this.assertParsedEquals(str, {
			year: 2020,
			month: 0,
			minute: 0,
			day: 1,
			...options,
		})
	}

	@test('parses day of week sun = sunday', 'sun', 'sunday')
	@test('parses day of week mon = monday', 'mon', 'monday')
	@test('parses day of week tue = tuesday', 'tue', 'tuesday')
	@test('parses day of week wed = wednesday', 'wed', 'wednesday')
	@test('parses day of week thu = thursday', 'thu', 'thursday')
	@test('parses day of week fri = friday', 'fri', 'friday')
	@test('parses day of week sat = saturday', 'sat', 'saturday')
	@test('parses day of week sun. = sunday', 'sun.', 'sunday')
	protected static canParseDayOfWeekInDifferentForms(
		str1: string,
		str2: string
	) {
		this.assertParsedMatch(str2, str1)
	}

	@test('can parse monday 4pm', 'monday 4pm', {
		day: 6,
		hour: 16,
	})
	@test('can parse thursday 11am', 'thursday 11', {
		day: 2,
		hour: 11,
	})
	@test('can parse next sunday @ 9am', 'next sunday @ 9am', {
		day: 5,
		hour: 9,
	})
	@test('can parse next tuesday at 9:32pm', 'next tuesday at 9:32pm', {
		day: 7,
		hour: 21,
		minute: 32,
	})
	protected static parsesDayOfWeekWithTime(
		str: string,
		options: Partial<IDate>
	) {
		this.reloadAsJan12020()
		this.assertParsedEquals(str, {
			year: 2020,
			month: 0,
			minute: 0,
			...options,
		})
	}

	@test('can parse next week', 'next week', {
		day: 8,
	})
	@test('can parse next week at 4pm', 'next week at 4pm', {
		day: 8,
		hour: 16,
	})
	@test('can parse 2 weeks', '2 weeks', {
		day: 15,
	})
	@test('can parse 2 weeks at 2pm', '2 weeks at 2pm', {
		day: 15,
		hour: 14,
	})
	@test('can parse 3 weeks', '3 weeks', {
		day: 22,
	})
	protected static parsesByAddingWeeks(str: string, options: Partial<IDate>) {
		this.reloadAsJan12020()
		this.assertParsedEquals(str, {
			year: 2020,
			month: 0,
			hour: 0,
			minute: 0,
			...options,
		})
	}

	@test()
	protected static async returnsNullIfNothingParsed() {
		this.assertParsesAsNull('hey there')
		this.assertParsesAsNull('go team')
		this.assertParsesAsNull('hello world')
		this.assertParsesAsNull('how does this work')
	}

	@test('can parse 4pm with different timezone', '4pm', 60, 16 + 1)
	@test('can parse 5pm with different timezone', '5pm', 120, 17 + 2)
	protected static async timezoneOffsetIsAppliedToTimeParser(
		str: string,
		offsetMinutes: number,
		hour: number
	) {
		this.locale.setTimezoneOffsetMinutes(offsetMinutes)
		this.reloadAsJan12020()
		const actual = this.parse(str)!
		const expected = this.normalizeDate(now(), {
			...this.startOf2020,
			hour,
		})
		this.assertTimestampsAreCloseEnough(actual, expected)
	}

	private static assertParsesAsNull(str: string) {
		this.assertParsedIsEqualTo(str, null)
	}

	private static reloadWithNow(options?: Partial<IDate>) {
		this.reloadParser(() => this.normalizeDate(new Date().getTime(), options))
	}

	private static reloadAsJan12020() {
		this.reloadWithNow(this.startOf2020)
	}

	private static reloadParser(now: () => number) {
		this.parser = DateParser.Parser(now, this.locale)
	}

	private static assertParsedEquals(str: string, options: Partial<IDate>) {
		const expected = this.normalizeDate(now(), options)
		this.assertParsedIsEqualTo(str, expected)
	}

	private static assertParsedIsEqualTo(str: string, expected: number | null) {
		const normalized = expected ? this.normalizeDate(expected) : null
		const actual = this.parse(str)

		this.assertTimestampsAreCloseEnough(actual, normalized)
	}

	private static assertTimestampsAreCloseEnough(
		actual: number | null,
		expected: number | null
	) {
		if (expected === null && actual !== null) {
			assert.fail("Expected parsed to return null, but it didn't")
			return
		}

		if (expected && actual) {
			assert.isEqual(
				dateUtil.formatDateTime(actual),
				dateUtil.formatDateTime(expected)
			)

			return
		}

		assert.isEqual(
			actual,
			expected,
			`The timestamps were not close enough!\n\n
Actual: ${actual ? dateUtil.formatDateTime(actual) : 'null'}
Expected: ${expected ? dateUtil.formatDateTime(expected) : 'null'}`
		)
	}

	private static parse(str: string) {
		return this.parser.parse(str)
	}

	private static assertParsedMatch(str2: string, str1: string) {
		const expected = this.parse(str2)
		const actual = this.parse(str1)

		this.assertTimestampsAreCloseEnough(actual, expected)
	}

	private static normalizeDate(date: number, options?: Partial<IDate>) {
		const { year, month, day, hour, minute } = dateUtil.splitDate(date)

		const normalized = dateUtil.date({
			year,
			month,
			day,
			hour,
			minute,
			milliseconds: 0,
			second: 0,
			...options,
		})
		return normalized
	}
}

function tomorrow() {
	return now() + 24 * 60 * 60 * 1000
}

function now(): number {
	return new Date().getTime()
}

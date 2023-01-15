import { assertOptions } from '@sprucelabs/schema'
import { Locale } from '../types/calendar.types'
import dateUtil from '../utilities/date.utility'
import { Parser, ParserContext, SplitDate } from './AbstractParser'
import ParserFactory from './ParserFactory'

export default class DateParser {
	private now: () => number
	private parsers: Parser[] = []
	protected locale: Locale

	private constructor(now: () => number, locale: Locale) {
		this.now = now
		this.locale = locale
		const parsers = ParserFactory.Factory(now, locale)
		this.parsers = [...parsers.all()]
	}

	public static Parser(now: () => number, locale: Locale) {
		assertOptions({ now, locale }, ['now', 'locale'])
		return new this(now, locale)
	}

	public parse(str: string) {
		const now = this.now()
		const date = dateUtil.splitDate(now) as SplitDate

		let parsed = str.toLocaleLowerCase().replace(/[^a-z0-9: ]/g, '')
		const original = parsed

		const context: ParserContext = {
			hasYear: false,
		}

		if (str !== 'now') {
			for (const parser of this.parsers) {
				parsed = parser.parse(parsed, date, context)
			}
		} else {
			parsed = ''
		}

		if (parsed === original) {
			return null
		}

		let normalized = dateUtil.date({
			...date,
			milliseconds: 0,
			second: 0,
		})

		return normalized
	}
}

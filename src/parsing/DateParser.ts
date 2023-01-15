import { assertOptions } from '@sprucelabs/schema'
import dateUtil from '../utilities/date.utility'
import { Parser, ParserContext, SplitDate } from './AbstractParser'
import ParserFactory from './ParserFactory'

export default class DateParser {
	private now: () => number
	private parsers: Parser[] = []

	private constructor(now: () => number) {
		this.now = now
		const parsers = ParserFactory.Factory(now)
		this.parsers = [...parsers.all()]
	}

	public static Parser(now: () => number) {
		assertOptions({ now }, ['now'])
		return new this(now)
	}

	public parse(str: string) {
		const now = this.now()
		const original = str
		const date = dateUtil.splitDate(now) as SplitDate

		let parsed = str.toLocaleLowerCase().replace(/[^a-z0-9: ]/g, '')
		const context: ParserContext = {
			hasYear: false,
		}

		if (str !== 'now') {
			for (const parser of this.parsers) {
				parsed = parser.parse(parsed, date, context)
			}
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

import { Locale } from '../types/calendar.types'
import { IDate } from '../utilities/date.utility'

export abstract class AbstractParser implements Parser {
	protected now: () => number
	protected locale: Locale
	public constructor(now: () => number, locale: Locale) {
		this.now = now
		this.locale = locale
	}
	public abstract parse(
		str: string,
		date: Required<IDate>,
		context: ParserContext
	): string
}

export interface Parser {
	parse(str: string, date: SplitDate, context: ParserContext): string
}

export interface ParserContext {
	hasYear: boolean
}

export type SplitDate = Required<IDate>

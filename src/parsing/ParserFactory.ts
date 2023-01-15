import { Parser } from './AbstractParser'
import DowParser from './strategies/DowParser'
import MonthParser from './strategies/MonthParser'
import TimeParser from './strategies/TimeParser'
import WeekParser from './strategies/WeekParser'
import YearParser from './strategies/YearParser'

export default class ParserFactory {
	public all() {
		return [
			this.Parser('Year'),
			this.Parser('Month'),
			this.Parser('Dow'),
			this.Parser('Week'),
			this.Parser('Time'),
		]
	}
	private now: () => number
	private strategies: {
		[K in ParserStrategy]: () => Parser
	} = {
		Year: () => new YearParser(this.now),
		Month: () => new MonthParser(this.now),
		Dow: () => new DowParser(this.now),
		Time: () => new TimeParser(this.now),
		Week: () => new WeekParser(this.now),
	}

	private constructor(now: () => number) {
		this.now = now
	}

	public static Factory(now: () => number) {
		return new this(now)
	}

	public Parser(parserType: ParserStrategy): Parser {
		return this.strategies[parserType]()
	}
}

export type ParserStrategy = 'Year' | 'Month' | 'Dow' | 'Time' | 'Week'

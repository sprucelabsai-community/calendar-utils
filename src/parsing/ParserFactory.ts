import { Locale } from '../types/calendar.types'
import { Parser } from './AbstractParser'
import DowParser from './strategies/DowParser'
import MonthParser from './strategies/MonthParser'
import TimeParser from './strategies/TimeParser'
import WeekParser from './strategies/WeekParser'
import YearParser from './strategies/YearParser'

export default class ParserFactory {
    private locale: Locale
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
        Year: () => new YearParser(this.now, this.locale),
        Month: () => new MonthParser(this.now, this.locale),
        Dow: () => new DowParser(this.now, this.locale),
        Time: () => new TimeParser(this.now, this.locale),
        Week: () => new WeekParser(this.now, this.locale),
    }

    private constructor(now: () => number, locale: Locale) {
        this.now = now
        this.locale = locale
    }

    public static Factory(now: () => number, locale: Locale) {
        return new this(now, locale)
    }

    public Parser(parserType: ParserStrategy): Parser {
        return this.strategies[parserType]()
    }
}

export type ParserStrategy = 'Year' | 'Month' | 'Dow' | 'Time' | 'Week'

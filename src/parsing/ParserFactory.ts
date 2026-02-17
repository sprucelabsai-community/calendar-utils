import { Locale } from '../types/calendar.types'
import { Parser } from './AbstractParser'
import DowParser from './strategies/DowParser'
import MonthParser from './strategies/MonthParser'
import TimeParser from './strategies/TimeParser'
import UsDateParser from './strategies/UsDateParser'
import WeekParser from './strategies/WeekParser'
import YearParser from './strategies/YearParser'

export default class ParserFactory {
    private locale: Locale

    private now: () => number
    private strategies: Record<ParserStrategy, () => Parser> = {
        Year: () => new YearParser(this.now, this.locale),
        Month: () => new MonthParser(this.now, this.locale),
        Dow: () => new DowParser(this.now, this.locale),
        Time: () => new TimeParser(this.now, this.locale),
        Week: () => new WeekParser(this.now, this.locale),
        UsDate: () => new UsDateParser(this.now, this.locale),
    }

    private constructor(now: () => number, locale: Locale) {
        this.now = now
        this.locale = locale
    }

    public all() {
        return [
            this.Parser('UsDate'),
            this.Parser('Year'),
            this.Parser('Month'),
            this.Parser('Dow'),
            this.Parser('Week'),
            this.Parser('Time'),
        ]
    }

    public static Factory(now: () => number, locale: Locale) {
        return new this(now, locale)
    }

    public Parser(parserType: ParserStrategy): Parser {
        return this.strategies[parserType]()
    }
}

export type ParserStrategy =
    | 'Year'
    | 'Month'
    | 'Dow'
    | 'Time'
    | 'Week'
    | 'UsDate'

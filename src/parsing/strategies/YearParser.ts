import { AbstractParser, ParserContext, SplitDate } from '../AbstractParser'

export default class YearParser extends AbstractParser {
    public parse(str: string, date: SplitDate, context: ParserContext): string {
        const matches = str.match(/\d{4}/)
        if (matches) {
            date.year = parseInt(matches[0], 10)
            str = str.replace(matches[0], '')
            context.hasYear = true
        }
        return str
    }
}

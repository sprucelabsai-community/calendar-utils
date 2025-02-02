import { AbstractParser, ParserContext, SplitDate } from '../AbstractParser'

export default class UsDateParser extends AbstractParser {
    public parse(str: string, date: SplitDate, context: ParserContext): string {
        const matches = str.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/)
        if (matches) {
            date.month = parseInt(matches[1]) - 1
            date.day = parseInt(matches[2])
            date.year = parseInt(
                matches[3].length === 2 ? `20${matches[3]}` : matches[3]
            )

            date.hour = -this.locale.getTimezoneOffsetMinutes() / 60
            date.minute = 0
            date.second = 0
            date.milliseconds = 0

            str = str.replace(matches[0], '')
            context.hasYear = true
        }

        return str
    }
}

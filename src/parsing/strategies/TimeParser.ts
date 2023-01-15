import dateUtil from '../../utilities/date.utility'
import { AbstractParser, ParserContext, SplitDate } from '../AbstractParser'

export default class TimeParser extends AbstractParser {
	public parse(str: string, date: SplitDate, context: ParserContext): string {
		const match = str.match(/(\d{1,2})(:(\d{2}))? ?(am|pm)?/)?.[0]

		if (!match) {
			return str
		}

		if (match) {
			date.hour = parseInt(match, 10)
			date.minute = 0
		}

		if (str.includes(':')) {
			date.minute = parseInt(str.split(':')[1], 10)
		}

		if (str.includes('pm')) {
			date.hour += 12
		} else if (date.hour === 12 && str.includes('am')) {
			date.hour = 0
		}

		if (!context.hasYear && dateUtil.date(date) < this.now() && str !== 'now') {
			date.hour += 12
		}

		return str
	}
}

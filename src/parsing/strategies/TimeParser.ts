import dateUtil from '../../utilities/date.utility'
import { AbstractParser, ParserContext, SplitDate } from '../AbstractParser'

export default class TimeParser extends AbstractParser {
	public parse(str: string, date: SplitDate, context: ParserContext): string {
		const match = str.match(/(\d{1,2})(:(\d{2}))? ?(am|pm)?/)?.[0]

		if (!match) {
			return str
		}

		if (match) {
			date.hour =
				parseInt(match, 10) + this.locale.getTimezoneOffsetMinutes() / 60
			date.minute = 0
			str = str.replace(match, '')
		}

		if (match.includes(':')) {
			date.minute = parseInt(match.split(':')[1], 10)
		}

		if (match.includes('pm')) {
			date.hour += 12
		} else if (date.hour === 12 && match.includes('am')) {
			date.hour = 0
		}

		if (!context.hasYear && dateUtil.date(date) < this.now()) {
			date.hour += 12
		}

		return str
	}
}

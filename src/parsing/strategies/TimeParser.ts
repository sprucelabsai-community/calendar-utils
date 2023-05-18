import dateUtil from '../../utilities/date.utility'
import { AbstractParser, ParserContext, SplitDate } from '../AbstractParser'

export default class TimeParser extends AbstractParser {
	public parse(str: string, date: SplitDate, context: ParserContext): string {
		const matches = str.match(/(\d{1,2})(:?(\d{1,2}))?\s*([ap]m?)?/) ?? []

		let [match, hour, , minutes, ampm] = matches

		if (!match) {
			return str
		}

		if (hour) {
			let parsedHour = parseInt(hour, 10)
			if (parsedHour > 12) {
				minutes = hour[1] + (minutes ?? '')
				hour = hour[0]
				parsedHour = parseInt(hour, 10)
			}

			date.hour = parsedHour - this.locale.getTimezoneOffsetMinutes() / 60
			date.minute = 0
		}

		if (minutes) {
			if (minutes.length === 1) {
				minutes += '0'
			}
			date.minute = parseInt(minutes, 10)
		}

		if (ampm?.includes('p')) {
			date.hour += 12
		} else if (date.hour === 12 && match.includes('am')) {
			date.hour = 0
		}

		if (!context.hasYear && dateUtil.date(date) < this.now()) {
			date.hour += 12
		}

		str = str.replace(match, '')

		return str
	}
}

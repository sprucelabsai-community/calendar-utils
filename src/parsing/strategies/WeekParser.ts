import { AbstractParser, SplitDate } from '../AbstractParser'

export default class WeekParser extends AbstractParser {
	public parse(str: string, date: SplitDate): string {
		if (str.includes('next week')) {
			date.day += 7
			str = str.replace('next week', '')
		}

		const match = str.match(/(\d{1,2}) ?(weeks?)/)?.[0]
		if (match) {
			date.day += parseInt(match, 10) * 7
			str = str.replace(match, '')
		}

		return str
	}
}

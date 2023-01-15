import { AbstractParser, SplitDate } from '../AbstractParser'

export default class MonthParser extends AbstractParser {
	public parse(str: string, date: SplitDate): string {
		let normalized = str
		normalized = this.normalizeMonths(normalized)

		const matches = normalized.match(
			/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec) ?(\d+)(?:nd|rd|th|st)?/i
		)

		if (matches) {
			date.month = [
				'jan',
				'feb',
				'mar',
				'apr',
				'may',
				'jun',
				'jul',
				'aug',
				'sep',
				'oct',
				'nov',
				'dec',
			].indexOf(matches[1])

			date.day = parseInt(matches[2], 10)
			normalized = normalized.replace(matches[0], '')

			return normalized
		}

		return str
	}

	private normalizeMonths(normalized: string) {
		const months = [
			{
				desired: 'jan',
				possible: ['january'],
			},
			{
				desired: 'feb',
				possible: ['february'],
			},
			{
				desired: 'mar',
				possible: ['march'],
			},
			{
				desired: 'apr',
				possible: ['april'],
			},
			{
				desired: 'may',
				possible: ['may'],
			},
			{
				desired: 'jun',
				possible: ['june'],
			},
			{
				desired: 'jul',
				possible: ['july'],
			},
			{
				desired: 'aug',
				possible: ['august'],
			},
			{
				desired: 'sep',
				possible: ['september'],
			},
			{
				desired: 'oct',
				possible: ['october'],
			},
			{
				desired: 'nov',
				possible: ['november'],
			},
			{
				desired: 'dec',
				possible: ['december'],
			},
		]
		for (const month of months) {
			for (const possible of month.possible) {
				normalized = normalized.replace(possible, month.desired)
			}
		}
		return normalized
	}
}

import dateUtil from '../../utilities/date.utility'
import { AbstractParser, SplitDate } from '../AbstractParser'

export default class DowParser extends AbstractParser {
	public parse(str: string, date: SplitDate): string {
		if (str.includes('tomorrow')) {
			date.day += 1
			str = str.replace('tomorrow', '')
		}

		const dows = [
			{
				abbr: 'sun',
				full: 'sunday',
			},
			{
				abbr: 'mon',
				full: 'monday',
			},
			{
				abbr: 'tue',
				full: 'tuesday',
			},
			{
				abbr: 'wed',
				full: 'wednesday',
			},
			{
				abbr: 'thu',
				full: 'thursday',
			},
			{
				abbr: 'fri',
				full: 'friday',
			},
			{
				abbr: 'sat',
				full: 'saturday',
			},
		]

		for (const dow of dows) {
			const re = new RegExp(`(^|\\W)${dow.abbr}(\\W|$)`, 'gi')
			str = str.replace(re, `$1${dow.full}$2`)
		}

		const match = str.match(
			/(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/
		)?.[0]

		if (match) {
			while (
				dateUtil.format(dateUtil.date(date), 'EEEE').toLocaleLowerCase() !==
				match
			) {
				date.day += 1
				str = str.replace(match, '')
			}
		}
		return str
	}
}

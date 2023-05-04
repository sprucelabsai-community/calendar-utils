import { assertOptions } from '@sprucelabs/schema'
import { DateUtil, Locale } from '../types/calendar.types'
import { IDate } from '../utilities/date.utility'

export default class DateUtilDecorator {
	private locale: Locale

	public constructor(locale: Locale) {
		assertOptions({ locale }, ['locale'])
		this.locale = locale
	}

	public makeLocaleAware(dateUtil: DateUtil): DateUtil {
		assertOptions({ dateUtil }, ['dateUtil'])
		return {
			...dateUtil,
			//@ts-ignore
			__beenDecorated: true,
			__locale: this.locale,
			date: (date?: IDate) => {
				let value: number | undefined
				if (!date) {
					const d = new Date()
					value = d.getTime() - d.getTimezoneOffset() * 60 * 1000
				} else {
					value = dateUtil.date(date)
				}
				return this.addOffset(value!)
			},
			setTimeOfDay: (...args: number[]) => {
				return this.addOffset(
					dateUtil.setTimeOfDay(...(args as [number, number, number]))
				)
			},
			format: (date: number, format: string) => {
				return dateUtil.format(this.addOffset(date, false), format)
			},
			getStartOfDay: (date: number | undefined) => {
				return this.addOffset(dateUtil.getStartOfDay(this.offsetDate(date)))
			},
			getEndOfDay: (date: number | undefined) => {
				return this.addOffset(dateUtil.getEndOfDay(this.offsetDate(date)))
			},
			getStartOfMonth: (date: number | undefined) => {
				return this.addOffset(dateUtil.getStartOfMonth(this.offsetDate(date)))
			},
			getEndOfMonth: (date: number | undefined) => {
				return this.addOffset(dateUtil.getEndOfMonth(this.offsetDate(date)))
			},
			splitDate: (timestamp: number) => {
				return dateUtil.splitDate(this.addOffset(timestamp, false))
			},
		}
	}

	private offsetDate(date: number | undefined): any {
		return this.addOffset(date ?? new Date().getTime(), false)
	}

	private addOffset(value: number, shouldInverse = true): number {
		let offset = this.locale.getTimezoneOffsetMinutes(value) * 60 * 1000
		if (shouldInverse) {
			offset = offset * -1
		}
		return value + offset
	}
}

import dateUtil from './date.utility'

const durationUtil = {
	dates: dateUtil,
	/**
	 * @deprecated durationUtil.msToFriendly(...) -> dateTimeUntilFriendly.renderDuration(...)
	 */
	msToFriendly(duration: number): string {
		return this.renderDuration(duration)
	},
	renderDuration(duration: number): string {
		let milliseconds = duration % 1000,
			seconds = Math.floor((duration / 1000) % 60),
			minutes = Math.floor((duration / (1000 * 60)) % 60),
			hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
		let durationStr = ''
		if (hours > 0) {
			durationStr += `${hours}hr`
		}
		if (minutes > 0) {
			durationStr += `${minutes}min `
		}
		if (seconds > 0) {
			if (hours > 0) {
				durationStr += '& '
			}
			if (milliseconds !== 0) {
				durationStr += `${(seconds * 1000 + milliseconds) / 1000}sec `
			} else {
				durationStr += `${seconds}sec `
			}
		}
		if (milliseconds > 0 && seconds === 0) {
			durationStr += `${milliseconds}ms`
		}
		return durationStr.trim()
	},

	/**
	 * @deprecated durationUtil.dateTimeUntilFriendly(...) -> dateTimeUntilFriendly.renderDateTimeUntil(...)
	 */
	dateTimeUntilFriendly(
		start: number,
		prefixes?: Partial<TimeUntilPrefixOptions>
	): string {
		return this.renderDateTimeUntil(start, prefixes)
	},

	renderDateTimeUntil(
		start: number,
		prefixes?: Partial<TimeUntilPrefixOptions>
	): string {
		const now = new Date().getTime()
		const {
			today = null,
			tomorrow = null,
			yesterday = null,
			future = null,
			past = null,
		} = prefixes ?? {}
		let prefix = today

		let startDateAndTime = 'today'
		const daysFromNow = Math.round((start - now) / (1000 * 3600 * 24))

		if (daysFromNow === -1) {
			prefix = yesterday
			startDateAndTime = 'yesterday'
		} else if (daysFromNow === 1) {
			prefix = tomorrow
			startDateAndTime = 'tomorrow'
		} else if (daysFromNow > 1) {
			prefix = future
			startDateAndTime =
				dateUtil.format(start, 'MMM do') + ` (in ${daysFromNow} days)`
		} else if (daysFromNow < -1) {
			prefix = past
			startDateAndTime =
				dateUtil.format(start, 'MMM do') + ` (${daysFromNow * -1} days ago)`
		}

		startDateAndTime += ` @ ${dateUtil.format(start, 'h:mmaaa')}`.replace(
			':00',
			''
		)
		return `${prefix ? `${prefix} ` : ''}${startDateAndTime}`
	},

	renderTimeRange(date1: number, date2: number): string {
		return this.dates.formatTime(date1) + ' to ' + this.dates.formatTime(date2)
	},
}
export default durationUtil

export interface TimeUntilPrefixOptions {
	yesterday?: string | null
	today?: string | null
	tomorrow?: string | null
	future?: string | null
	past?: string | null
}

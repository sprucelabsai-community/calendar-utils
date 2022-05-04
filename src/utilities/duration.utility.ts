import dateUtil from './date.utility'

const durationUtil = {
	msToFriendly(duration: number): string {
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

	timeUntilFriendly(start: number) {
		const now = new Date().getTime()

		let startDateAndTime = 'today'
		const daysFromNow = Math.round((start - now) / (1000 * 3600 * 24))

		if (daysFromNow === -1) {
			startDateAndTime = 'yesterday'
		} else if (daysFromNow === 1) {
			startDateAndTime = 'tomorrow'
		} else if (daysFromNow > 1) {
			startDateAndTime =
				dateUtil.format(start, 'MMM do') + ` (in ${daysFromNow} days)`
		} else if (daysFromNow < 1) {
			startDateAndTime =
				dateUtil.format(start, 'MMM do') + ` (${daysFromNow * -1} days ago)`
		}

		startDateAndTime += ` @ ${dateUtil.format(start, 'h:mmaaa')}`.replace(
			':00',
			''
		)
		return startDateAndTime
	},
}
export default durationUtil

import { TimezoneName } from '../types/calendar.types'
import dateUtil from './date.utility'

const durationUtil = {
    dates: dateUtil,
    renderDuration(durationMs: number): string {
        let milliseconds = durationMs % 1000,
            seconds = Math.floor((durationMs / 1000) % 60),
            minutes = Math.floor((durationMs / (1000 * 60)) % 60),
            hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24)
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

    renderDateTimeUntil(
        beginning: number,
        end: number,
        prefixes?: Partial<TimeUntilOptions>
    ): string {
        const {
            today = null,
            tomorrow = null,
            yesterday = null,
            future = null,
            past = null,
            shouldCapitalize,
        } = prefixes ?? {}

        let prefix = today

        let startDateAndTime = 'today'
        const daysFromNow = Math.round(
            (this.dates.getStartOfDay(end) -
                this.dates.getStartOfDay(beginning)) /
                (1000 * 3600 * 24)
        )

        if (daysFromNow === -1) {
            prefix = yesterday
            startDateAndTime = 'yesterday'
        } else if (daysFromNow === 1) {
            prefix = tomorrow
            startDateAndTime = 'tomorrow'
        } else if (daysFromNow > 1) {
            prefix = future
            startDateAndTime =
                this.dates.format(end, 'MMM do') + ` (in ${daysFromNow} days)`
        } else if (daysFromNow < -1) {
            prefix = past
            startDateAndTime =
                this.dates.format(end, 'MMM do') +
                ` (${daysFromNow * -1} days ago)`
        }

        startDateAndTime += ` @ ${this.dates.format(end, 'h:mmaaa')}`.replace(
            ':00',
            ''
        )
        return optionallUcFirst(
            `${prefix ? `${prefix} ` : ''}${startDateAndTime}`,
            shouldCapitalize
        )
    },

    renderTimeRange(date1: number, date2: number): string {
        return (
            this.dates.formatTime(date1) + ' to ' + this.dates.formatTime(date2)
        )
    },
}

export default durationUtil

function optionallUcFirst(str: string, shouldCapitalize?: boolean) {
    if (shouldCapitalize) {
        return str[0].toUpperCase() + str.substring(1)
    }

    return str
}

export interface TimeUntilOptions {
    yesterday?: string | null
    today?: string | null
    tomorrow?: string | null
    future?: string | null
    past?: string | null
    shouldCapitalize?: boolean
    timezoneName?: TimezoneName
}

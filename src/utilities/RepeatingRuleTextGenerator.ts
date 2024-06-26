import { assertOptions } from '@sprucelabs/schema'
import {
    CalendarEvent,
    DateUtil,
    DayOfWeek,
    Repeats,
} from '../types/calendar.types'

export default class RepeatingRuleTextGenerator {
    private unitMap: Record<Repeats, string> = {
        daily: 'days',
        weekly: 'weeks',
        monthly: 'months',
    }

    private downMap: Record<DayOfWeek, string> = {
        sun: 'Sundays',
        mon: 'Mondays',
        tue: 'Tuesdays',
        wed: 'Wednesdays',
        thur: 'Thursdays',
        fri: 'Fridays',
        sat: 'Saturdays',
    }
    private dates: DateUtil

    private constructor(dates: DateUtil) {
        this.dates = dates
    }

    public static Generator(options: { dates: DateUtil }) {
        const { dates } = assertOptions(options, ['dates'])
        return new this(dates)
    }

    public generate(
        event: Pick<
            CalendarEvent,
            | 'repeats'
            | 'interval'
            | 'daysOfWeek'
            | 'occurrences'
            | 'repeatsUntil'
            | 'activeUntilDate'
        >
    ) {
        const {
            repeats,
            repeatsUntil,
            interval,
            daysOfWeek,
            occurrences,
            activeUntilDate,
        } = event

        let message = ''

        if (repeats) {
            if (daysOfWeek) {
                message = `Repeats weekly on ${daysOfWeek
                    .map((d) => this.downMap[d])
                    .join(', ')}`
            } else if ((interval ?? 0) > 1) {
                message = `Repeats every ${interval} ${this.unitMap[repeats]}`
            } else {
                message = `Repeats ${repeats}`
            }

            const until = activeUntilDate ?? repeatsUntil
            if (until) {
                message += ` until ${this.dates.formatDate(until)}.`
            } else if (occurrences) {
                message += ` for ${occurrences} times.`
            } else {
                message += ` forever.`
            }
        }

        return message
    }
}

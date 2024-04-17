import { RRule, datetime } from 'rrule'
import { calculateOffsetAtDate } from '../locales/DateUtilDecorator'
import LocaleImpl from '../locales/Locale'
import {
    CalendarEvent,
    RepeatingCalendarEvent,
    TimezoneName,
} from '../types/calendar.types'
import dateUtil from './date.utility'

const calendarUtil = {
    freqMapToRRule: {
        weekly: RRule.WEEKLY,
        monthly: RRule.MONTHLY,
        daily: RRule.DAILY,
    },

    locale: new LocaleImpl(),

    weekDaysMapToRRuleDays: {
        mon: RRule.MO,
        tue: RRule.TU,
        wed: RRule.WE,
        thur: RRule.TH,
        fri: RRule.FR,
        sat: RRule.SA,
        sun: RRule.SU,
    },

    applyRuleAndGetEvents(
        e: RepeatingCalendarEvent,
        dateUntil: number,
        timezone: TimezoneName
    ) {
        const events = this.applyRuleAndGetEventsWithoutExclusion(
            e,
            dateUntil,
            timezone
        )
        const excludedEvents = events.filter((e) => !this.isExcluded(e))

        return excludedEvents
    },
    applyRuleAndGetEventsWithoutExclusion(
        e: Pick<
            CalendarEvent,
            | 'repeats'
            | 'repeatsUntil'
            | 'daysOfWeek'
            | 'daysOfMonth'
            | 'interval'
            | 'startDateTimeMs'
            | 'occurrences'
            | 'nthOccurrences'
            | 'timeBlocks'
            | 'nthInRepeating'
            | 'totalInRepeating'
        >,
        dateUntil: number,
        timezone: TimezoneName
    ) {
        let repeatsUntil: number | undefined

        if (e.repeats) {
            if (e.repeatsUntil) {
                repeatsUntil = Math.min(e.repeatsUntil, dateUntil)
            } else {
                repeatsUntil = dateUntil
            }

            const offset =
                this.locale.getTimezoneOffsetMinutes(
                    e.startDateTimeMs,
                    timezone
                ) *
                60 *
                1000

            const startSplit = dateUtil.splitDate(e.startDateTimeMs + offset)

            const dtstart = datetime(
                startSplit.year,
                startSplit.month + 1,
                startSplit.day,
                startSplit.hour,
                startSplit.minute
            )

            const rule = new RRule({
                freq: this.freqMapToRRule[e.repeats],
                interval: e.interval ?? 1,
                byweekday: e.daysOfWeek?.map(
                    (d) => this.weekDaysMapToRRuleDays[d]
                ),
                dtstart,
                bymonthday: e.daysOfMonth?.map((d) => parseInt(d)),
                until: new Date(repeatsUntil),
                count: e.occurrences,
                bysetpos: e.nthOccurrences?.map((o) => {
                    if (o >= 0) {
                        ++o
                    }
                    return o
                }),
            })

            const events = this.mapRulesToEvents(rule, e, timezone)

            return events
        }

        return [e]
    },
    mapRulesToEvents(
        rule: RRule,
        e: Pick<CalendarEvent, 'startDateTimeMs'>,
        timezone: TimezoneName
    ) {
        const allEvents = rule.all()

        let events = allEvents.map((r, idx) => {
            const iosDate = dateUtil.splitDate(r.getTime())
            const startDateTimeMs = dateUtil.date(iosDate)
            const offset = calculateOffsetAtDate(iosDate, this.locale, timezone)

            return {
                ...e,
                nthInRepeating: idx,
                totalInRepeating: allEvents.length,
                startDateTimeMs: startDateTimeMs - offset,
            }
        }) as CalendarEvent[]

        return events
    },
    isExcluded(e: Pick<CalendarEvent, 'exclusionDates' | 'startDateTimeMs'>) {
        if (e.exclusionDates) {
            const splitStartDate = dateUtil.splitDate(e.startDateTimeMs)

            const isExcluded = e.exclusionDates.find((d) => {
                if (
                    splitStartDate.year === d.year &&
                    splitStartDate.month === d.month &&
                    splitStartDate.day === d.day
                ) {
                    return true
                }
                return false
            })
            if (isExcluded) {
                return true
            }
        }
        return false
    },

    getEventFromRangeByDate(
        values: RepeatingCalendarEvent,
        date: number,
        timezone: TimezoneName
    ) {
        const dateUntil = dateUtil.addYears(new Date().getTime(), 10)
        const searchDate = dateUtil.splitDate(date)
        const repeatingEvents = this.applyRuleAndGetEvents(
            values,
            dateUntil,
            timezone
        )
        return repeatingEvents.find((e) => {
            const event = dateUtil.splitDate(e.startDateTimeMs)
            if (
                searchDate.year === event.year &&
                searchDate.month === event.month &&
                searchDate.day === event.day
            ) {
                return true
            }
            return false
        })
    },
}

export default calendarUtil

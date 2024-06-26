import { timezoneChoices } from '@sprucelabs/spruce-core-schemas'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import LocaleImpl from '../locales/Locale'
import dateUtil from '../utilities/date.utility'
import durationUtil from '../utilities/duration.utility'

type D = typeof dateUtil
/**
 * @deprecated DateUtils -> DateUtil
 */
export interface DateUtils extends D {}
export interface DateUtil extends D {}

type Du = typeof durationUtil
export interface DurationUtil extends Du {}

export type CalendarEvent =
    SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEvent
export type DayOfWeek = NonNullable<CalendarEvent['daysOfWeek']>[number]

export type TimezoneChoices = typeof timezoneChoices
export type TimezoneName = TimezoneChoices[number]['value']
export type Repeats = NonNullable<CalendarEvent['repeats']>

export type Locale = Pick<
    LocaleImpl,
    | 'on'
    | 'getZoneName'
    | 'offsetMinutesToZoneName'
    | 'getTimezoneOffsetMinutes'
    | 'setTimezoneOffsetMinutes'
    | 'setZoneName'
    | 'zoneNameToOffsetMinutes'
>

export interface SorterCalendarEvent {
    id: string
    groupId?: string
    startDateTimeMs: number
    personId: string
}

export type RepeatingCalendarEvent = Pick<
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
>

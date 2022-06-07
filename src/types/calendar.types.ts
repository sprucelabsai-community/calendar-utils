import { timezoneChoices } from '@sprucelabs/spruce-core-schemas'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import dateUtil from '../utilities/date.utility'

type D = typeof dateUtil
export interface DateUtils extends D {}

export type CalendarEvent =
	SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEvent
export type DayOfWeek = NonNullable<CalendarEvent['daysOfWeek']>[number]

type TimezoneChoices = typeof timezoneChoices
export type TimezoneName = TimezoneChoices[number]['value']

export interface Locale {
	setTimezoneOffsetMinutes(offset: number): void
	getTimezoneOffsetMinutes(): number
	zoneNameToOffsetMinutes(name: TimezoneName): number
}

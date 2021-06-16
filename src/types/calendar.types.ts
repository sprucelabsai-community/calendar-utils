import { SpruceSchemas } from '#spruce/schemas/schemas.types'

export type CalendarEvent =
	SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEvent
export type DayOfWeek = NonNullable<CalendarEvent['daysOfWeek']>[number]

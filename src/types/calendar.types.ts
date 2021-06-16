import { SpruceSchemas } from '#spruce/schemas/schemas.types'

export type CalendarEvent = SpruceSchemas.Calendar.v2021_05_05.CalendarEvent
export type DayOfWeek = NonNullable<CalendarEvent['daysOfWeek']>[number]

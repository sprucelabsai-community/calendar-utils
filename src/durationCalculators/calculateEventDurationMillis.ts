import { SpruceSchemas } from '@sprucelabs/mercury-types'
import calculateServiceDurationMinutes from './calculateEventDurationMinutes'

export default function calculateServiceDurationMillis(service: {
	timeBlocks: Pick<
		SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock,
		'durationMinutes'
	>[]
}) {
	return calculateServiceDurationMinutes(service) * 60 * 1000
}

import { SpruceSchemas } from '@sprucelabs/mercury-types'
import calculateEventDurationMinutes from './calculateEventDurationMinutes'

export default function calculateEventDurationMillis(service: {
	timeBlocks: Pick<
		SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock,
		'durationMinutes'
	>[]
}) {
	return calculateEventDurationMinutes(service) * 60 * 1000
}

import { SpruceSchemas } from '@sprucelabs/mercury-types'

export default function calculateServiceDurationMinutes(service: {
	timeBlocks: Pick<
		SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock,
		'durationMinutes'
	>[]
}) {
	return service.timeBlocks.reduce((duration, block) => {
		duration += block.durationMinutes
		return duration
	}, 0)
}

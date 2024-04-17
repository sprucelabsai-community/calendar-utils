import { SpruceSchemas } from '@sprucelabs/mercury-types'
import calculateEventDurationMinutes from './calculateEventDurationMinutes'

export default function calculateEventDurationMillis(event: {
    timeBlocks: Pick<
        SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock,
        'durationMinutes'
    >[]
}) {
    return calculateEventDurationMinutes(event) * 60 * 1000
}

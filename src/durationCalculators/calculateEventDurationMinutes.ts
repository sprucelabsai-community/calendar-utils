import { SpruceSchemas } from '@sprucelabs/mercury-types'

export default function calculateEventDurationMinutes(event: {
    timeBlocks: Pick<
        SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock,
        'durationMinutes'
    >[]
}) {
    return event.timeBlocks.reduce((duration, block) => {
        duration += block.durationMinutes
        return duration
    }, 0)
}

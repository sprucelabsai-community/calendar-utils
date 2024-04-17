import { SpruceSchemas } from '@sprucelabs/mercury-types'
import dateUtil from '../../utilities/date.utility'

function generateRandomMinutes(maxMinutes: number): number {
    return Math.round((Math.random() * maxMinutes + 15) / 15) * 15
}
let idCount = 0
type Event = SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEvent
export default function generateEventValues(values?: Partial<Event>): Event {
    const blocks = [1, 3]
    const totalTimeBlocks = blocks[Math.round(Math.random())]

    const hour = Math.round(Math.random() * 8) + 9

    return {
        id: `${random()}-${idCount++}`,
        startDateTimeMs: dateUtil.setTimeOfDay(
            new Date().getTime(),
            hour,
            generateRandomMinutes(45),
            0,
            0
        ),
        target: {
            personId: `${random()}`,
            locationId: `${random()}`,
        },
        calendarId: `${random()}`,
        timeBlocks: new Array(totalTimeBlocks).fill(0).map((_, idx) => ({
            durationMinutes: generateRandomMinutes(75),
            isBusy: !(idx % 2),
            title: `Block ${random()}-${idCount++}`,
            subtitle: `Subtitle ${random()}-${idCount++}`,
        })),
        source: {},
        dateCreated: new Date().getTime(),
        ...values,
    }
}
function random() {
    return new Date().getTime() * Math.random()
}

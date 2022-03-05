import { SpruceSchemas } from '@sprucelabs/mercury-types'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import calculateServiceDurationMillis from '../../durationCalculators/calculateEventDurationMillis'
import calculateServiceDurationMinutes from '../../durationCalculators/calculateEventDurationMinutes'
import dateUtil from '../../utilities/date.utility'

//extracted from calendar skill, most tests there.
export default class DurationCalculatorTest extends AbstractSpruceTest {
	@test()
	protected static async canCalculateDurationMillis() {
		const event = generateEventValues()
		const durationMin = calculateServiceDurationMinutes(event)
		const expected = durationMin * 60 * 1000
		const actual = calculateServiceDurationMillis(event)
		assert.isEqual(actual, expected)
	}
}

function generateRandomMinutes(maxMinutes: number): number {
	return Math.round((Math.random() * maxMinutes + 15) / 15) * 15
}

let idCount = 0

type Event = SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEvent

function generateEventValues(values?: Partial<Event>): Event {
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

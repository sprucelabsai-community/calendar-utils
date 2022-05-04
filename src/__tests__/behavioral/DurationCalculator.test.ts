import { SpruceSchemas } from '@sprucelabs/mercury-types'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { lunch, tomorrowLunch } from '../../dates'
import calculateEventDurationMillis from '../../durationCalculators/calculateEventDurationMillis'
import calculateEventDurationMinutes from '../../durationCalculators/calculateEventDurationMinutes'
import dateUtil from '../../utilities/date.utility'
import durationUtil from '../../utilities/duration.utility'

//extracted from calendar skill, most tests there.
export default class DurationCalculatorTest extends AbstractSpruceTest {
	@test()
	protected static async canCalculateDurationMillis() {
		const event = generateEventValues()
		const durationMin = calculateEventDurationMinutes(event)
		const expected = durationMin * 60 * 1000
		const actual = calculateEventDurationMillis(event)
		assert.isEqual(actual, expected)
	}

	@test(
		'sets expected startDateAndTime to tomorrow',
		tomorrowLunch(),
		'tomorrow @ 12pm'
	)
	@test('sets expected startDateAndTime to today', lunch(), 'today @ 12pm')
	@test(
		'sets expected startDateAndTime to day after tomorrow',
		dateUtil.addDays(lunch(), 2),
		dateUtil.format(dateUtil.addDays(lunch(), 2), 'MMM do') +
			' (in 2 days) @ 12pm'
	)
	@test(
		'sets expected startDateAndTime for in 3 days',
		dateUtil.addDays(lunch(), 3),
		dateUtil.format(dateUtil.addDays(lunch(), 3), 'MMM do') +
			' (in 3 days) @ 12pm'
	)
	@test(
		'sets expected startDateAndTime tomorrow at 1230',
		dateUtil.addMinutes(tomorrowLunch(), 30),
		'tomorrow @ 12:30pm'
	)
	@test(
		'sets expected startDateAndTime yesterday at 12',
		dateUtil.addDays(lunch(), -1),
		'yesterday @ 12pm'
	)
	@test(
		'sets expected startDateAndTime for back 3 days',
		dateUtil.addDays(lunch(), -3),
		dateUtil.format(dateUtil.addDays(lunch(), -3), 'MMM do') +
			' (3 days ago) @ 12pm'
	)
	protected static async expectedFriendlyStartBasedOnFirstBookedService(
		date: number,
		expected: string
	) {
		const actual = durationUtil.timeUntilFriendly(date)
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

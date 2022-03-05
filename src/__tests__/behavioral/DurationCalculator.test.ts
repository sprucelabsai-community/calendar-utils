import { calendarSeeder } from '@sprucelabs/heartwood-view-controllers'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import calculateServiceDurationMillis from '../../durationCalculators/calculateEventDurationMillis'
import calculateServiceDurationMinutes from '../../durationCalculators/calculateEventDurationMinutes'

//extracted from calendar skill, most tests there.
export default class DurationCalculatorTest extends AbstractSpruceTest {
	@test()
	protected static async canCalculateDurationMillis() {
		const event = calendarSeeder.generateEventValues()
		const durationMin = calculateServiceDurationMinutes(event)
		const expected = durationMin * 60 * 1000
		const actual = calculateServiceDurationMillis(event)
		assert.isEqual(actual, expected)
	}
}

import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import durationUtil from '../../utilities/duration.utility'

export default class DurationUtilTest extends AbstractSpruceTest {
	@test('1sec', 1000, '1sec')
	@test('500ms', 500, '500ms')
	@test('30min', 1800000, '30min')
	@test('1.5sec', 1500, '1.5sec')
	@test('1hr', 1000 * 60 * 60, '1hr')
	@test('1hr30min', 1000 * 60 * 60 + 1000 * 60 * 30, '1hr30min')
	@test(
		'1hr15min & 10sec',
		1000 * 60 * 60 + 1000 * 60 * 15 + 1000 * 10,
		'1hr15min & 10sec'
	)
	@test(
		'1hr15min & 10.75sec',
		1000 * 60 * 60 + 1000 * 60 * 15 + 1000 * 10 + 750,
		'1hr15min & 10.75sec'
	)
	protected static async canCreateDurationUtil(
		duration: number,
		expected: string
	) {
		const actual = durationUtil.msToFriendly(duration)
		assert.isEqual(actual, expected)
	}
}

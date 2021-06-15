import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'


class DateUtil {}

export default class DateUtilTest extends AbstractSpruceTest {

	@test()
	protected static async canCreateDateUtil() {
		const dateUtil = new DateUtil()
		assert.isTruthy(dateUtil)
	}

	@test()
	protected static async yourNextTest() {
		assert.isTrue(false)
	}
}

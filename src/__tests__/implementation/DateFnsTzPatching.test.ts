import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import dateUtil from '../../utilities/date.utility'

export default class DateFnsTzPatchingTest extends AbstractSpruceTest {
	@test()
	protected static async canCreateDateFnsTzPatching() {
		const date1 = dateUtil.format(new Date().getTime(), 'PPpp')
		const date = new Date()
		const date2 = dateUtil.format(date.getTime(), 'PPpp')

		require('date-fns-tz')
		const date3 = dateUtil.format(date.getTime(), 'PPpp')
		assert.isEqual(date1, date2)
		assert.isEqual(date1, date3)
	}
}

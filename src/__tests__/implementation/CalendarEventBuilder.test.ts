import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import calendarEventSchema from '#spruce/schemas/calendarUtils/v2021_05_19/calendarEvent.schema'

export default class CalendarEventBuilderTest extends AbstractSpruceTest {
    @test()
    protected static async daysOfMonthOptionsAre1to31() {
        const daysOfMonth = calendarEventSchema.fields.daysOfMonth
        assert.isLength(daysOfMonth.options.choices, 31)
        const values = daysOfMonth.options.choices.map((r) => r.value)

        const expected = []
        for (let i = 1; i <= 31; i++) {
            expected.push(`${i}`)
        }

        assert.isEqualDeep(values, expected)
    }
}

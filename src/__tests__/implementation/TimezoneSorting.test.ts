import { SelectChoice } from '@sprucelabs/schema'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import LocaleImpl from '../../locales/Locale'
import TimezoneChoiceSorter from '../../locales/TimezoneChoiceSorter'

export default class TimezoneSortingTest extends AbstractSpruceTest {
    private static sorter: TimezoneChoiceSorter
    private static locale: LocaleImpl

    protected static async beforeEach() {
        await super.beforeEach()
        this.locale = new LocaleImpl()
        this.sorter = new TimezoneChoiceSorter(this.locale)
    }

    @test()
    protected static throwsWhenMissingOnConstructor() {
        //@ts-ignore
        const err = assert.doesThrow(() => new TimezoneChoiceSorter())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['locale'],
        })
    }

    @test()
    protected static sortThrowsWhenMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.sorter.sort())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['choices'],
        })
    }

    @test()
    protected static sortDoesntThrowWhenReceivesExpected() {
        this.assertSortMatchesExpected([], [])
    }

    @test()
    protected static dropsInOffsetForOneOption() {
        this.assertSortMatchesExpected(
            [{ label: 'UTC', value: 'UTC' }],
            [{ label: '(+0) UTC', value: 'UTC' }]
        )
        const expectedMinutes =
            this.locale.zoneNameToOffsetMinutes('America/Detroit')

        this.assertSortMatchesExpected(
            [{ label: 'something', value: 'America/Detroit' }],
            [
                {
                    label: `(${expectedMinutes / 60}) something`,
                    value: 'America/Detroit',
                },
            ]
        )
    }

    @test()
    protected static returnsAllOptions() {
        const res = this.sort([
            { label: 'UTC', value: 'UTC' },
            { label: 'Denver', value: 'America/Denver' },
        ])
        assert.isLength(res, 2)
    }

    @test()
    protected static sortsOptions() {
        const expected = [
            'America/Denver',
            'America/Detroit',
            'UTC',
            'Europe/Minsk',
        ]
        const res = this.sort([
            { label: 'UTC', value: 'UTC' },
            { label: 'Denver', value: 'America/Denver' },
            { label: 'Minsk', value: 'Europe/Minsk' },
            { label: 'Detroit', value: 'America/Detroit' },
        ])

        assert.isEqualDeep(
            res.map((c) => c.value),
            expected
        )
    }

    @test()
    protected static async sortsAlphabeticalAfterOffset() {
        const res = this.sort([
            { label: 'Denver', value: 'America/Denver' },
            { label: 'Yellow Knife', value: 'America/YellowKnife' },
        ])

        assert.isEqual(res[0].value, 'America/Denver')
    }

    private static assertSortMatchesExpected(
        choices: SelectChoice[],
        expected: SelectChoice[]
    ) {
        const res = this.sort(choices)
        assert.isEqualDeep(res, expected)
    }

    private static sort(choices: SelectChoice[]) {
        return this.sorter.sort(choices as any)
    }
}

import { SelectChoice } from '@sprucelabs/schema'
import AbstractSpruceTest, { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import LocaleImpl from '../../locales/Locale'
import TimezoneChoiceSorter from '../../locales/TimezoneChoiceSorter'

@suite()
export default class TimezoneSortingTest extends AbstractSpruceTest {
    private sorter!: TimezoneChoiceSorter
    private locale!: LocaleImpl

    protected async beforeEach() {
        await super.beforeEach()
        this.locale = new LocaleImpl()
        this.sorter = new TimezoneChoiceSorter(this.locale)
    }

    @test()
    protected throwsWhenMissingOnConstructor() {
        //@ts-ignore
        const err = assert.doesThrow(() => new TimezoneChoiceSorter())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['locale'],
        })
    }

    @test()
    protected sortThrowsWhenMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.sorter.sort())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['choices'],
        })
    }

    @test()
    protected sortDoesntThrowWhenReceivesExpected() {
        this.assertSortMatchesExpected([], [])
    }

    @test()
    protected dropsInOffsetForOneOption() {
        this.assertSortMatchesExpected(
            [{ label: 'UTC', value: 'UTC' }],
            [{ label: '(+0) UTC', value: 'UTC' }]
        )
        const expectedMinutes =
            this.locale.zoneNameToOffsetMinutes('America/New_York')

        this.assertSortMatchesExpected(
            [{ label: 'something', value: 'America/New_York' }],
            [
                {
                    label: `(${expectedMinutes / 60}) something`,
                    value: 'America/New_York',
                },
            ]
        )
    }

    @test()
    protected returnsAllOptions() {
        const res = this.sort([
            { label: 'UTC', value: 'UTC' },
            { label: 'Denver', value: 'America/Denver' },
        ])
        assert.isLength(res, 2)
    }

    @test()
    protected sortsOptions() {
        const expected = [
            'America/Denver',
            'America/New_York',
            'UTC',
            'Europe/Moscow',
        ]
        const res = this.sort([
            { label: 'UTC', value: 'UTC' },
            { label: 'Denver', value: 'America/Denver' },
            { label: 'Minsk', value: 'Europe/Moscow' },
            { label: 'Detroit', value: 'America/New_York' },
        ])

        assert.isEqualDeep(
            res.map((c) => c.value),
            expected
        )
    }

    @test()
    protected async sortsAlphabeticalAfterOffset() {
        const res = this.sort([
            { label: 'Denver', value: 'America/Denver' },
            { label: 'Yellow Knife', value: 'America/YellowKnife' },
        ])

        assert.isEqual(res[0].value, 'America/Denver')
    }

    private assertSortMatchesExpected(
        choices: SelectChoice[],
        expected: SelectChoice[]
    ) {
        const res = this.sort(choices)
        assert.isEqualDeep(res, expected)
    }

    private sort(choices: SelectChoice[]) {
        return this.sorter.sort(choices as any)
    }
}

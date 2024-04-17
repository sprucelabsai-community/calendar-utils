import { assertOptions, SelectChoice } from '@sprucelabs/schema'
import { Locale, TimezoneChoices } from '../types/calendar.types'

export default class TimezoneChoiceSorter {
    private locale: Locale

    public constructor(locale: Locale) {
        assertOptions({ locale }, ['locale'])
        this.locale = locale
    }
    public sort(choices: TimezoneChoices) {
        assertOptions({ choices }, ['choices'])
        let results = []
        if (choices.length > 0) {
            for (const choice of choices) {
                const { label, offset } = this.renderLabelForChoice(choice)
                results.push({
                    label,
                    offset,
                    value: choice.value,
                })
            }
        }

        results.sort((a, b) => {
            const sortA = this.sortValue(a)
            const sortB = this.sortValue(b)

            if (sortA === sortB) {
                return 0
            }

            return sortA > sortB ? 1 : -1
        })

        const updated = results.map((r) => ({
            label: r.label,
            value: r.value,
        }))

        return updated
    }

    private sortValue(a: SelectChoice & { offset: number }) {
        const offset = a.offset + 100
        const searchValue = `${offset * 100}`.padStart(8, '0') + ` - ${a.value}`

        return searchValue
    }

    private renderLabelForChoice(choice: SelectChoice) {
        const offset = this.hourOffsetForChoice(choice)
        const prefix = this.prefixForOffset(offset)
        const label = `(${prefix}${offset}) ` + choice.label
        return { label, offset }
    }

    private prefixForOffset(offset: number) {
        return offset < 0 ? '' : '+'
    }

    private hourOffsetForChoice(choice: SelectChoice) {
        return this.locale.zoneNameToOffsetMinutes(choice.value as any) / 60
    }
}

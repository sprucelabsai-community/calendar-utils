import { assert } from '@sprucelabs/test-utils'
import {
    DateUtil,
    DurationUtil,
    Locale,
    TimezoneName,
} from '../types/calendar.types'

const dateAssert = {
    isLocaleAware(datesOrDuration: DateUtil | DurationUtil) {
        //@ts-ignore
        if (datesOrDuration.dates) {
            //@ts-ignore
            this.isLocaleAware(datesOrDuration.dates)
            return
        }

        assert.isTrue(
            //@ts-ignore
            datesOrDuration.__beenDecorated,
            `DateUtil is not locale aware. Try using the DateUtilDecorator to make it locale aware.`
        )
    },

    currentTimezoneEquals(
        datesOrDuration: DateUtil | DurationUtil,
        timezone: TimezoneName
    ) {
        this.isLocaleAware(datesOrDuration)

        //@ts-ignore
        if (datesOrDuration.dates) {
            this.currentTimezoneEquals(
                //@ts-ignore
                datesOrDuration.dates,
                timezone
            )
            return
        }

        //@ts-ignore
        const locale = datesOrDuration.__locale as Locale
        const actual = locale.getZoneName()
        assert.isEqual(
            actual,
            timezone,
            `Timezone is not ${timezone}, it is ${actual}`
        )
    },
}

export default dateAssert

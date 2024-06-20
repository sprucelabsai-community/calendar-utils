import DateUtilDecorator from '../locales/DateUtilDecorator'
import LocaleImpl from '../locales/Locale'
import { DurationUtil, TimezoneName } from '../types/calendar.types'
import dateUtil from './date.utility'
import durationUtil from './duration.utility'

export default class DurationUtilBuilder {
    public static durationUtil = { ...durationUtil }
    public static lastBuiltDurationUtil?: DurationUtil

    public static async getForTimezone(timezone: TimezoneName) {
        const locale = new LocaleImpl()
        await locale.setZoneName(timezone)
        const durationUtilCopy = { ...this.durationUtil }
        durationUtilCopy.dates = new DateUtilDecorator(locale).makeLocaleAware(
            dateUtil
        )
        this.lastBuiltDurationUtil = durationUtilCopy
        return durationUtilCopy
    }

    public static reset() {
        this.durationUtil = { ...durationUtil }
    }
}

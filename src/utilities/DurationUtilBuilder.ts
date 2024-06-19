import DateUtilDecorator from '../locales/DateUtilDecorator'
import LocaleImpl from '../locales/Locale'
import { TimezoneName } from '../types/calendar.types'
import dateUtil from './date.utility'
import durationUtil from './duration.utility'

export default class DurationUtilBuilder {
    public static durationUtil = { ...durationUtil }

    public static async getForTimezone(timezone: TimezoneName) {
        const locale = new LocaleImpl()
        await locale.setZoneName(timezone)
        const durationUtilCopy = { ...this.durationUtil }
        durationUtilCopy.dates = new DateUtilDecorator(locale).makeLocaleAware(
            dateUtil
        )
        return durationUtilCopy
    }

    public static reset() {
        this.durationUtil = { ...durationUtil }
    }
}

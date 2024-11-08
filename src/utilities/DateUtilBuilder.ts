import DateUtilDecorator from '../locales/DateUtilDecorator'
import LocaleImpl from '../locales/Locale'
import { DateUtil, TimezoneName } from '../types/calendar.types'
import dateUtil from './date.utility'

export default class DateUtilBuilder {
    public static lastBuiltDateUtil?: DateUtil
    private static didBuildHandler: DidBuildHandler = (dateUtil) => dateUtil

    public static didBuild(cb: DidBuildHandler) {
        this.didBuildHandler = cb
    }

    public static async getForTimezone(timezone: TimezoneName) {
        const locale = new LocaleImpl()
        await locale.setZoneName(timezone)

        const decorator = new DateUtilDecorator(locale)
        const results = this.didBuildHandler(
            decorator.makeLocaleAware(dateUtil)
        )

        this.lastBuiltDateUtil = results
        return results
    }

    public static reset() {
        delete this.lastBuiltDateUtil
        this.didBuildHandler = (dateUtil) => dateUtil
    }
}

type DidBuildHandler = (dateUtil: DateUtil) => DateUtil

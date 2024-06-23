import LocaleImpl from '../../locales/Locale'
import { TimezoneName } from '../../types/calendar.types'

export default class SpyLocale extends LocaleImpl {
    public declare currentZone?: TimezoneName
    public zoneNameToOffsetMinutesCount = 0
    public clearCurrentZone() {
        this.currentZone = undefined
    }

    public clearCache() {
        this.offsetsForDate = {}
    }

    public zoneNameToOffsetMinutes(name: TimezoneName, onDate?: number) {
        this.zoneNameToOffsetMinutesCount++
        return super.zoneNameToOffsetMinutes(name, onDate)
    }
}

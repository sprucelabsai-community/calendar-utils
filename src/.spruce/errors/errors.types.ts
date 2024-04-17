import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'

export declare namespace SpruceErrors.CalendarUtils {
    export interface InvalidTimezoneName {
        name: string
    }

    export interface InvalidTimezoneNameSchema extends SpruceSchema.Schema {
        id: 'invalidTimezoneName'
        namespace: 'CalendarUtils'
        name: 'Invalid timezone name'
        moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils'
        fields: {
            /** . */
            name: {
                type: 'text'
                isRequired: true
                options: undefined
            }
        }
    }

    export type InvalidTimezoneNameEntity =
        SchemaEntity<SpruceErrors.CalendarUtils.InvalidTimezoneNameSchema>
}

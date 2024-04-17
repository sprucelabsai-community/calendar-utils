import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const calendarEventTargetSchema: SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventTargetSchema =
    {
        id: 'calendarEventTarget',
        version: 'v2021_05_19',
        namespace: 'CalendarUtils',
        name: '',
        moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils',
        fields: {
            /** . */
            locationId: {
                type: 'id',
                options: undefined,
            },
            /** . */
            personId: {
                type: 'id',
                isRequired: true,
                options: undefined,
            },
            /** . */
            organizationId: {
                type: 'id',
                options: undefined,
            },
            /** . */
            skillId: {
                type: 'id',
                options: undefined,
            },
            /** . */
            roleId: {
                type: 'id',
                options: undefined,
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(calendarEventTargetSchema)

export default calendarEventTargetSchema

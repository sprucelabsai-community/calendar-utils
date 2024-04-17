import { SchemaRegistry } from '@sprucelabs/schema'
import calendarEventLineIconSchema_v2021_05_19 from '#spruce/schemas/calendarUtils/v2021_05_19/calendarEventLineIcon.schema'
import { SpruceSchemas } from '../../schemas.types'

const eventTimeBlockSchema: SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlockSchema =
    {
        id: 'eventTimeBlock',
        version: 'v2021_05_19',
        namespace: 'CalendarUtils',
        name: '',
        moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils',
        fields: {
            /** . */
            title: {
                type: 'text',
                options: undefined,
            },
            /** . */
            subtitle: {
                type: 'text',
                options: undefined,
            },
            /** . */
            isBusy: {
                type: 'boolean',
                isRequired: true,
                options: undefined,
            },
            /** . */
            durationMinutes: {
                type: 'number',
                isRequired: true,
                options: undefined,
            },
            /** . */
            rightIcons: {
                type: 'schema',
                isArray: true,
                options: { schema: calendarEventLineIconSchema_v2021_05_19 },
            },
            /** . */
            leftIcons: {
                type: 'schema',
                isArray: true,
                options: { schema: calendarEventLineIconSchema_v2021_05_19 },
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(eventTimeBlockSchema)

export default eventTimeBlockSchema

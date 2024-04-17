import { SchemaRegistry } from '@sprucelabs/schema'

import calendarEventTargetSchema_v2021_05_19 from '#spruce/schemas/calendarUtils/v2021_05_19/calendarEventTarget.schema'
import eventExclusionDateSchema_v2021_05_19 from '#spruce/schemas/calendarUtils/v2021_05_19/eventExclusionDate.schema'
import eventTimeBlockSchema_v2021_05_19 from '#spruce/schemas/calendarUtils/v2021_05_19/eventTimeBlock.schema'
import eventSourceSchema_v2021_09_13 from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventSource.schema'
import { SpruceSchemas } from '../../schemas.types'

const calendarEventSchema: SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventSchema =
    {
        id: 'calendarEvent',
        version: 'v2021_05_19',
        namespace: 'CalendarUtils',
        name: '',
        moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils',
        fields: {
            /** . */
            id: {
                type: 'id',
                isRequired: true,
                options: undefined,
            },
            /** . */
            source: {
                type: 'schema',
                isRequired: true,
                options: { schema: eventSourceSchema_v2021_09_13 },
            },
            /** . */
            target: {
                type: 'schema',
                isRequired: true,
                options: { schema: calendarEventTargetSchema_v2021_05_19 },
            },
            /** . */
            calendarId: {
                type: 'id',
                isRequired: true,
                options: undefined,
            },
            /** . */
            eventTypeSlug: {
                type: 'text',
                options: undefined,
            },
            /** . */
            startDateTimeMs: {
                type: 'dateTime',
                isRequired: true,
                options: undefined,
            },
            /** . */
            isBusy: {
                type: 'boolean',
                options: undefined,
            },
            /** . */
            isResizeable: {
                type: 'boolean',
                options: undefined,
            },
            /** . */
            style: {
                type: 'select',
                options: {
                    choices: [
                        { value: 'draft', label: 'Draft' },
                        { value: 'tentative', label: 'Tentative' },
                        { value: 'upcoming', label: 'Upcoming' },
                        { value: 'unavailable', label: 'Unavailable' },
                        { value: 'blocked', label: 'Blocked' },
                        { value: 'active', label: 'Active' },
                        { value: 'past', label: 'Past' },
                        { value: 'warn', label: 'Warning' },
                        { value: 'critical', label: 'Critical' },
                    ],
                },
            },
            /** . */
            groupId: {
                type: 'id',
                options: undefined,
            },
            /** . */
            timeBlocks: {
                type: 'schema',
                isRequired: true,
                isArray: true,
                minArrayLength: 1,
                options: { schema: eventTimeBlockSchema_v2021_05_19 },
            },
            /** . */
            repeats: {
                type: 'select',
                options: {
                    choices: [
                        { value: 'weekly', label: 'Weekly' },
                        { value: 'monthly', label: 'Monthly' },
                        { value: 'daily', label: 'Daily' },
                    ],
                },
            },
            /** . */
            daysOfWeek: {
                type: 'select',
                isArray: true,
                options: {
                    choices: [
                        { value: 'sun', label: 'Sunday' },
                        { value: 'mon', label: 'Monday' },
                        { value: 'tue', label: 'Tuesday' },
                        { value: 'wed', label: 'Wednesday' },
                        { value: 'thur', label: 'Thursday' },
                        { value: 'fri', label: 'Friday' },
                        { value: 'sat', label: 'Saturday' },
                    ],
                },
            },
            /** . */
            daysOfMonth: {
                type: 'select',
                isArray: true,
                options: {
                    choices: [
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                        { value: '6', label: '6' },
                        { value: '7', label: '7' },
                        { value: '8', label: '8' },
                        { value: '9', label: '9' },
                        { value: '10', label: '10' },
                        { value: '11', label: '11' },
                        { value: '12', label: '12' },
                        { value: '13', label: '13' },
                        { value: '14', label: '14' },
                        { value: '15', label: '15' },
                        { value: '16', label: '16' },
                        { value: '17', label: '17' },
                        { value: '18', label: '18' },
                        { value: '19', label: '19' },
                        { value: '20', label: '20' },
                        { value: '21', label: '21' },
                        { value: '22', label: '22' },
                        { value: '23', label: '23' },
                        { value: '24', label: '24' },
                        { value: '25', label: '25' },
                        { value: '26', label: '26' },
                        { value: '27', label: '27' },
                        { value: '28', label: '28' },
                        { value: '29', label: '29' },
                        { value: '30', label: '30' },
                        { value: '31', label: '31' },
                    ],
                },
            },
            /** . */
            repeatsUntil: {
                type: 'dateTime',
                options: undefined,
            },
            /** . */
            occurrences: {
                type: 'number',
                options: undefined,
            },
            /** . */
            interval: {
                type: 'number',
                options: undefined,
            },
            /** . */
            nthOccurrences: {
                type: 'number',
                isArray: true,
                options: undefined,
            },
            /** . */
            activeUntilDate: {
                type: 'dateTime',
                options: undefined,
            },
            /** . */
            exclusionDates: {
                type: 'schema',
                isArray: true,
                options: { schema: eventExclusionDateSchema_v2021_05_19 },
            },
            /** . */
            dateDeleted: {
                type: 'dateTime',
                options: undefined,
            },
            /** . */
            dateCreated: {
                type: 'dateTime',
                isRequired: true,
                options: undefined,
            },
            /** . */
            nthInRepeating: {
                type: 'number',
                options: undefined,
            },
            /** . */
            totalInRepeating: {
                type: 'number',
                options: undefined,
            },
            /** . */
            meta: {
                type: 'raw',
                options: { valueType: `Record<string, any>` },
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(calendarEventSchema)

export default calendarEventSchema

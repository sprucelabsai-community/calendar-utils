import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventSourceSchema_v2021_09_13 from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventSource.schema'
import eventTargetSchema_v2021_09_13 from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventTarget.schema'
import eventTimeBlockSchemaSchema_v2021_05_19 from '#spruce/schemas/calendarUtils/v2021_05_19/eventTimeBlockSchema.schema'
import eventExclusionDateSchema_v2021_05_19 from '#spruce/schemas/calendarUtils/v2021_05_19/eventExclusionDate.schema'

const calendarEventSchema: SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventSchema  = {
	id: 'calendarEvent',
	version: 'v2021_05_19',
	namespace: 'CalendarUtils',
	name: '',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'source': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventSourceSchema_v2021_09_13,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema_v2021_09_13,}
	            },
	            /** . */
	            'calendarId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'eventTypeSlug': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'startDateTimeMs': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'timeBlocks': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                minArrayLength: 1,
	                options: {schema: eventTimeBlockSchemaSchema_v2021_05_19,}
	            },
	            /** . */
	            'repeats': {
	                type: 'select',
	                options: {choices: [{"value":"weekly","label":"Weekly"},{"value":"monthly","label":"Monthly"},{"value":"daily","label":"Daily"}],}
	            },
	            /** . */
	            'daysOfWeek': {
	                type: 'select',
	                isArray: true,
	                options: {choices: [{"value":"sun","label":"Sunday"},{"value":"mon","label":"Monday"},{"value":"tue","label":"Tuesday"},{"value":"wed","label":"Wednesday"},{"value":"thur","label":"Thursday"},{"value":"fri","label":"Friday"},{"value":"sat","label":"Saturday"}],}
	            },
	            /** . */
	            'repeatsUntil': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'occurrences': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'interval': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'nthOccurrences': {
	                type: 'number',
	                isArray: true,
	                options: undefined
	            },
	            /** . */
	            'activeUntilDate': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'exclusionDates': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: eventExclusionDateSchema_v2021_05_19,}
	            },
	            /** . */
	            'dateDeleted': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'dateCreated': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'personId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(calendarEventSchema)

export default calendarEventSchema

import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema_v2021_06_15 from '#spruce/schemas/calendar/v2021_06_15/eventTarget.schema'
import eventExclusionDateSchema_v2021_06_15 from '#spruce/schemas/calendar/v2021_06_15/eventExclusionDate.schema'

const calendarEventSchema: SpruceSchemas.Calendar.v2021_06_15.CalendarEventSchema  = {
	id: 'calendarEvent',
	version: 'v2021_06_15',
	namespace: 'Calendar',
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
	                options: {schema: eventTargetSchema_v2021_06_15,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema_v2021_06_15,}
	            },
	            /** . */
	            'calendarId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'startDate': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'endDate': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'title': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
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
	                options: {schema: eventExclusionDateSchema_v2021_06_15,}
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
	    }
}

SchemaRegistry.getInstance().trackSchema(calendarEventSchema)

export default calendarEventSchema

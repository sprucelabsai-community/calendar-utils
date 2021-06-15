/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

export { SpruceSchemas } from '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types'

import { default as SchemaEntity } from '@sprucelabs/schema'



import * as SpruceSchema from '@sprucelabs/schema'


declare module '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types' {


	namespace SpruceSchemas.Calendar.v2021_06_15 {

		
		interface EventExclusionDate {
			
				
				'year': number
				
				'month': number
				
				'day': number
		}

		interface EventExclusionDateSchema extends SpruceSchema.Schema {
			id: 'eventExclusionDate',
			version: 'v2021_06_15',
			namespace: 'Calendar',
			name: '',
			    fields: {
			            /** . */
			            'year': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'month': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'day': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type EventExclusionDateEntity = SchemaEntity<SpruceSchemas.Calendar.v2021_06_15.EventExclusionDateSchema>

	}


	namespace SpruceSchemas.Calendar.v2021_06_15 {

		
		interface EventTarget {
			
				
				'locationId'?: string| undefined | null
				
				'personId'?: string| undefined | null
				
				'organizationId'?: string| undefined | null
				
				'skillId'?: string| undefined | null
				
				'roleId'?: string| undefined | null
		}

		interface EventTargetSchema extends SpruceSchema.Schema {
			id: 'eventTarget',
			version: 'v2021_06_15',
			namespace: 'Calendar',
			name: '',
			    fields: {
			            /** . */
			            'locationId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'personId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'organizationId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'skillId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'roleId': {
			                type: 'id',
			                options: undefined
			            },
			    }
		}

		type EventTargetEntity = SchemaEntity<SpruceSchemas.Calendar.v2021_06_15.EventTargetSchema>

	}


	namespace SpruceSchemas.Calendar.v2021_06_15 {

		
		interface CalendarEvent {
			
				
				'id': string
				
				'source': SpruceSchemas.Calendar.v2021_06_15.EventTarget
				
				'target': SpruceSchemas.Calendar.v2021_06_15.EventTarget
				
				'calendarId': string
				
				'startDate': number
				
				'endDate': number
				
				'title': string
				
				'repeats'?: ("weekly" | "monthly" | "daily")| undefined | null
				
				'daysOfWeek'?: ("sun" | "mon" | "tue" | "wed" | "thur" | "fri" | "sat")[]| undefined | null
				
				'repeatsUntil'?: number| undefined | null
				
				'occurrences'?: number| undefined | null
				
				'interval'?: number| undefined | null
				
				'nthOccurrences'?: number[]| undefined | null
				
				'activeUntilDate': number
				
				'exclusionDates'?: SpruceSchemas.Calendar.v2021_06_15.EventExclusionDate[]| undefined | null
				
				'dateDeleted'?: number| undefined | null
				
				'dateCreated': number
		}

		interface CalendarEventSchema extends SpruceSchema.Schema {
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
			                options: {schema: SpruceSchemas.Calendar.v2021_06_15.EventTargetSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Calendar.v2021_06_15.EventTargetSchema,}
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
			                options: {schema: SpruceSchemas.Calendar.v2021_06_15.EventExclusionDateSchema,}
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

		type CalendarEventEntity = SchemaEntity<SpruceSchemas.Calendar.v2021_06_15.CalendarEventSchema>

	}





























}

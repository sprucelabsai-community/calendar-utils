/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

export { SpruceSchemas } from '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types'

import { default as SchemaEntity } from '@sprucelabs/schema'



import * as SpruceSchema from '@sprucelabs/schema'

import '@sprucelabs/spruce-event-utils'

declare module '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types' {


	namespace SpruceSchemas.CalendarUtils.v2021_05_19 {

		
		interface EventExclusionDate {
			
				
				'year': number
				
				'month': number
				
				'day': number
		}

		interface EventExclusionDateSchema extends SpruceSchema.Schema {
			id: 'eventExclusionDate',
			version: 'v2021_05_19',
			namespace: 'CalendarUtils',
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

		type EventExclusionDateEntity = SchemaEntity<SpruceSchemas.CalendarUtils.v2021_05_19.EventExclusionDateSchema>

	}


	namespace SpruceSchemas.CalendarUtils.v2021_05_19 {

		
		interface EventTimeBlock {
			
				
				'title': string
				
				'subtitle'?: string| undefined | null
				
				'isBusy': boolean
				
				'durationMinutes': number
		}

		interface EventTimeBlockSchema extends SpruceSchema.Schema {
			id: 'eventTimeBlock',
			version: 'v2021_05_19',
			namespace: 'CalendarUtils',
			name: '',
			    fields: {
			            /** . */
			            'title': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'subtitle': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'isBusy': {
			                type: 'boolean',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'durationMinutes': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type EventTimeBlockEntity = SchemaEntity<SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlockSchema>

	}


	namespace SpruceSchemas.CalendarUtils.v2021_05_19 {

		
		interface CalendarEventTarget {
			
				
				'locationId'?: string| undefined | null
				
				'personId'?: string| undefined | null
				
				'organizationId'?: string| undefined | null
				
				'skillId'?: string| undefined | null
				
				'roleId'?: string| undefined | null
				
				'calendarEventPersonId': string
		}

		interface CalendarEventTargetSchema extends SpruceSchema.Schema {
			id: 'calendarEventTarget',
			version: 'v2021_05_19',
			namespace: 'CalendarUtils',
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
			            /** . */
			            'calendarEventPersonId': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type CalendarEventTargetEntity = SchemaEntity<SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventTargetSchema>

	}


	namespace SpruceSchemas.CalendarUtils.v2021_05_19 {

		
		interface CalendarEvent {
			
				
				'id': string
				
				'source': SpruceSchemas.SpruceEventUtils.v2021_09_13.EventSource
				
				'target': SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventTarget
				
				'calendarId': string
				
				'eventTypeSlug'?: string| undefined | null
				
				'startDateTimeMs': number
				
				'timeBlocks': SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock[]
				
				'repeats'?: ("weekly" | "monthly" | "daily")| undefined | null
				
				'daysOfWeek'?: ("sun" | "mon" | "tue" | "wed" | "thur" | "fri" | "sat")[]| undefined | null
				
				'repeatsUntil'?: number| undefined | null
				
				'occurrences'?: number| undefined | null
				
				'interval'?: number| undefined | null
				
				'nthOccurrences'?: number[]| undefined | null
				
				'activeUntilDate': number
				
				'exclusionDates'?: SpruceSchemas.CalendarUtils.v2021_05_19.EventExclusionDate[]| undefined | null
				
				'dateDeleted'?: number| undefined | null
				
				'dateCreated': number
		}

		interface CalendarEventSchema extends SpruceSchema.Schema {
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
			                options: {schema: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventSourceSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventTargetSchema,}
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
			                options: {schema: SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlockSchema,}
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
			                options: {schema: SpruceSchemas.CalendarUtils.v2021_05_19.EventExclusionDateSchema,}
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

		type CalendarEventEntity = SchemaEntity<SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventSchema>

	}

}

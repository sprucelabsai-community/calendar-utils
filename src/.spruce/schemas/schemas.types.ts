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
			moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils',
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

		interface EventExclusionDateEntity extends SchemaEntity<SpruceSchemas.CalendarUtils.v2021_05_19.EventExclusionDateSchema> {}

	}


	namespace SpruceSchemas.CalendarUtils.v2021_05_19 {

		
		interface CalendarEventLineIcon {
			
				
				'icon': ("sprucebot" | "add-circle" | "chevron-left" | "document-text" | "link-angle" | "play-circle" | "star" | "add-square" | "chevron-right" | "download-cloud" | "link-flat" | "present" | "sun" | "add" | "chevron-up" | "download" | "loader" | "refresh-circle" | "tag" | "alarm" | "clipboard" | "edit-box" | "location-pin" | "refresh" | "time" | "arrow-back" | "clock" | "edit-line" | "lock" | "repeat" | "tool" | "arrow-down-circle" | "close-circle" | "email" | "map" | "restricted" | "trending-down" | "arrow-down" | "close-square" | "emoji-happy" | "message-circle" | "rotate" | "trending-up" | "arrow-next" | "close" | "emoji-sad" | "message-square" | "search-no" | "triangle" | "arrow-up-circle" | "code" | "external-link" | "mic-off" | "search" | "unlock" | "arrow-up" | "coffee" | "fav-heart" | "mic-on" | "selector-checked" | "upload-cloud" | "attachment" | "command" | "flag" | "minus-circle" | "selector-circle-filled" | "upload" | "award-badge" | "corner-down-left" | "flip-01" | "minus-square" | "selector-circle" | "user-add" | "binoculars" | "corner-down-right" | "flip-02" | "money-sign" | "send" | "user-delete" | "bolt" | "corner-left-down" | "folder" | "more-horizontal" | "settings-filled" | "user" | "book-open" | "corner-left-up" | "globe" | "more-vertical" | "settings" | "users" | "book" | "corner-right-down" | "hash-tag" | "notification-off" | "share" | "video-off" | "bookmark" | "corner-right-up" | "headphones" | "notification-on" | "shopping-bag" | "video" | "calendar-add" | "corner-up-left" | "help-buoy" | "object" | "shopping-cart" | "warning" | "calendar" | "corner-up-right" | "help-circle" | "pause-circle" | "sort-filter-down" | "wifi" | "camera" | "crop" | "home" | "phone-unavailable" | "sort-filter-up" | "zoom-in" | "cellphone" | "delete" | "info" | "phone" | "sound-off" | "zoom-out" | "checkmark" | "document-blank" | "jump" | "photo" | "sound-on" | "chevron-down" | "document-new" | "layers" | "picked" | "star-filled")
				
				'hint'?: string| undefined | null
		}

		interface CalendarEventLineIconSchema extends SpruceSchema.Schema {
			id: 'calendarEventLineIcon',
			version: 'v2021_05_19',
			namespace: 'CalendarUtils',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils',
			    fields: {
			            /** . */
			            'icon': {
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
			            },
			            /** . */
			            'hint': {
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		interface CalendarEventLineIconEntity extends SchemaEntity<SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventLineIconSchema> {}

	}


	namespace SpruceSchemas.CalendarUtils.v2021_05_19 {

		
		interface EventTimeBlock {
			
				
				'title'?: string| undefined | null
				
				'subtitle'?: string| undefined | null
				
				'isBusy': boolean
				
				'durationMinutes': number
				
				'rightIcons'?: SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventLineIcon[]| undefined | null
				
				'leftIcons'?: SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventLineIcon[]| undefined | null
		}

		interface EventTimeBlockSchema extends SpruceSchema.Schema {
			id: 'eventTimeBlock',
			version: 'v2021_05_19',
			namespace: 'CalendarUtils',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils',
			    fields: {
			            /** . */
			            'title': {
			                type: 'text',
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
			            /** . */
			            'rightIcons': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventLineIconSchema,}
			            },
			            /** . */
			            'leftIcons': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventLineIconSchema,}
			            },
			    }
		}

		interface EventTimeBlockEntity extends SchemaEntity<SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlockSchema> {}

	}


	namespace SpruceSchemas.CalendarUtils.v2021_05_19 {

		
		interface CalendarEventTarget {
			
				
				'locationId'?: string| undefined | null
				
				'personId': string
				
				'organizationId'?: string| undefined | null
				
				'skillId'?: string| undefined | null
				
				'roleId'?: string| undefined | null
		}

		interface CalendarEventTargetSchema extends SpruceSchema.Schema {
			id: 'calendarEventTarget',
			version: 'v2021_05_19',
			namespace: 'CalendarUtils',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils',
			    fields: {
			            /** . */
			            'locationId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'personId': {
			                type: 'id',
			                isRequired: true,
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

		interface CalendarEventTargetEntity extends SchemaEntity<SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventTargetSchema> {}

	}


	namespace SpruceSchemas.CalendarUtils.v2021_05_19 {

		
		interface CalendarEvent {
			
				
				'id': string
				
				'source': SpruceSchemas.SpruceEventUtils.v2021_09_13.EventSource
				
				'target': SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventTarget
				
				'calendarId': string
				
				'eventTypeSlug'?: string| undefined | null
				
				'startDateTimeMs': SpruceSchema.DateTimeFieldValue
				
				'isBusy'?: boolean| undefined | null
				
				'isResizeable'?: boolean| undefined | null
				
				'style'?: ("draft" | "tentative" | "upcoming" | "unavailable" | "blocked" | "active" | "past" | "warn" | "critical")| undefined | null
				
				'groupId'?: string| undefined | null
				
				'timeBlocks': SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock[]
				
				'repeats'?: ("weekly" | "monthly" | "daily")| undefined | null
				
				'daysOfWeek'?: ("sun" | "mon" | "tue" | "wed" | "thur" | "fri" | "sat")[]| undefined | null
				
				'daysOfMonth'?: ("1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31")[]| undefined | null
				
				'repeatsUntil'?: SpruceSchema.DateTimeFieldValue| undefined | null
				
				'occurrences'?: number| undefined | null
				
				'interval'?: number| undefined | null
				
				'nthOccurrences'?: number[]| undefined | null
				
				'activeUntilDate'?: SpruceSchema.DateTimeFieldValue| undefined | null
				
				'exclusionDates'?: SpruceSchemas.CalendarUtils.v2021_05_19.EventExclusionDate[]| undefined | null
				
				'dateDeleted'?: SpruceSchema.DateTimeFieldValue| undefined | null
				
				'dateCreated': SpruceSchema.DateTimeFieldValue
				
				'nthInRepeating'?: number| undefined | null
				
				'totalInRepeating'?: number| undefined | null
				
				'meta'?: (Record<string, any>)| undefined | null
		}

		interface CalendarEventSchema extends SpruceSchema.Schema {
			id: 'calendarEvent',
			version: 'v2021_05_19',
			namespace: 'CalendarUtils',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils',
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
			                type: 'dateTime',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'isBusy': {
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'isResizeable': {
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'style': {
			                type: 'select',
			                options: {choices: [{"value":"draft","label":"Draft"},{"value":"tentative","label":"Tentative"},{"value":"upcoming","label":"Upcoming"},{"value":"unavailable","label":"Unavailable"},{"value":"blocked","label":"Blocked"},{"value":"active","label":"Active"},{"value":"past","label":"Past"},{"value":"warn","label":"Warning"},{"value":"critical","label":"Critical"}],}
			            },
			            /** . */
			            'groupId': {
			                type: 'id',
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
			            'daysOfMonth': {
			                type: 'select',
			                isArray: true,
			                options: {choices: [{"value":"1","label":"1"},{"value":"2","label":"2"},{"value":"3","label":"3"},{"value":"4","label":"4"},{"value":"5","label":"5"},{"value":"6","label":"6"},{"value":"7","label":"7"},{"value":"8","label":"8"},{"value":"9","label":"9"},{"value":"10","label":"10"},{"value":"11","label":"11"},{"value":"12","label":"12"},{"value":"13","label":"13"},{"value":"14","label":"14"},{"value":"15","label":"15"},{"value":"16","label":"16"},{"value":"17","label":"17"},{"value":"18","label":"18"},{"value":"19","label":"19"},{"value":"20","label":"20"},{"value":"21","label":"21"},{"value":"22","label":"22"},{"value":"23","label":"23"},{"value":"24","label":"24"},{"value":"25","label":"25"},{"value":"26","label":"26"},{"value":"27","label":"27"},{"value":"28","label":"28"},{"value":"29","label":"29"},{"value":"30","label":"30"},{"value":"31","label":"31"}],}
			            },
			            /** . */
			            'repeatsUntil': {
			                type: 'dateTime',
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
			                type: 'dateTime',
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
			                type: 'dateTime',
			                options: undefined
			            },
			            /** . */
			            'dateCreated': {
			                type: 'dateTime',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'nthInRepeating': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'totalInRepeating': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'meta': {
			                type: 'raw',
			                options: {valueType: `Record<string, any>`,}
			            },
			    }
		}

		interface CalendarEventEntity extends SchemaEntity<SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventSchema> {}

	}

}

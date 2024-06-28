/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */

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
			
				
				'icon': ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out")
				
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
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
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

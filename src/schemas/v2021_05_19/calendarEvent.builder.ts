import { buildSchema } from '@sprucelabs/schema'
import {
	eventSourceSchema,
	eventTargetSchema,
} from '@sprucelabs/spruce-event-utils'
import {
	daysOfWeek,
	eventStyleChoices,
	lineIconChoices,
	repeats,
} from '../../constants'

export const eventExclusionDateSchema = buildSchema({
	id: 'eventExclusionDate',
	fields: {
		year: {
			type: 'number',
			isRequired: true,
		},
		month: {
			type: 'number',
			isRequired: true,
		},
		day: {
			type: 'number',
			isRequired: true,
		},
	},
})

const calendarEventLineIconSchema = buildSchema({
	id: 'calendarEventLineIcon',
	fields: {
		icon: {
			type: 'select',
			isRequired: true,
			options: {
				choices: lineIconChoices,
			},
		},
		hint: {
			type: 'text',
		},
	},
})

export const eventTimeBlocksSchema = buildSchema({
	id: 'eventTimeBlock',
	fields: {
		title: { type: 'text' },
		subtitle: { type: 'text' },
		isBusy: { type: 'boolean', isRequired: true },
		durationMinutes: { type: 'number', isRequired: true },
		rightIcons: {
			type: 'schema',
			isArray: true,
			options: {
				schema: calendarEventLineIconSchema,
			},
		},
		leftIcons: {
			type: 'schema',
			isArray: true,
			options: {
				schema: calendarEventLineIconSchema,
			},
		},
	},
})

export default buildSchema({
	id: 'calendarEvent',
	fields: {
		id: {
			type: 'id',
			isRequired: true,
		},
		source: {
			type: 'schema',
			isRequired: true,
			options: {
				schema: eventSourceSchema,
			},
		},
		target: {
			type: 'schema',
			isRequired: true,
			options: {
				schema: {
					id: 'calendarEventTarget',
					fields: {
						...eventTargetSchema.fields,
						personId: {
							type: 'id',
							isRequired: true,
						},
					},
				},
			},
		},
		calendarId: {
			type: 'id',
			isRequired: true,
		},
		eventTypeSlug: {
			type: 'text',
		},
		startDateTimeMs: {
			type: 'dateTime',
			isRequired: true,
		},
		isBusy: {
			type: 'boolean',
		},
		isResizeable: {
			type: 'boolean',
		},
		style: {
			type: 'select',
			options: {
				choices: eventStyleChoices,
			},
		},
		groupId: {
			type: 'id',
		},
		timeBlocks: {
			type: 'schema',
			isArray: true,
			isRequired: true,
			minArrayLength: 1,
			options: {
				schema: eventTimeBlocksSchema,
			},
		},
		repeats: {
			type: 'select',
			options: {
				choices: Object.keys(repeats).map((r) => ({
					value: r,
					//@ts-ignore
					label: repeats[r],
				})),
			},
		},
		daysOfWeek: {
			type: 'select',
			isArray: true,
			options: {
				choices: buildDaysOfWeekChoices(),
			},
		},
		daysOfMonth: {
			type: 'select',
			isArray: true,
			options: { choices: buildDaysOfMonthChoices() },
		},
		repeatsUntil: {
			type: 'dateTime',
		},
		occurrences: {
			type: 'number',
		},
		interval: {
			type: 'number',
		},
		nthOccurrences: {
			type: 'number',
			isArray: true,
		},
		activeUntilDate: {
			type: 'dateTime',
		},
		exclusionDates: {
			type: 'schema',
			isArray: true,
			options: {
				schema: eventExclusionDateSchema,
			},
		},
		dateDeleted: {
			type: 'dateTime',
		},
		dateCreated: {
			type: 'dateTime',
			isRequired: true,
		},
		nthInRepeating: {
			type: 'number',
		},
		totalInRepeating: {
			type: 'number',
		},
		meta: {
			type: 'raw',
			options: {
				valueType: 'Record<string, any>',
			},
		},
	},
})

function buildDaysOfWeekChoices(): {
	value: string
	label: any
}[] {
	return Object.keys(daysOfWeek).map((r) => ({
		value: r,
		//@ts-ignore
		label: daysOfWeek[r],
	}))
}

function buildDaysOfMonthChoices(): {
	value: string
	label: string
}[] {
	return Array.from({ length: 31 }, (_, i) => i + 1).map((n) => ({
		value: `${n}`,
		label: `${n}`,
	}))
}

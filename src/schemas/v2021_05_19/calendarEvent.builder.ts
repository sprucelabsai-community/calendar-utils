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

export const eventTimeBlocksSchema = buildSchema({
	id: 'eventTimeBlock',
	fields: {
		title: { type: 'text' },
		subtitle: { type: 'text' },
		isBusy: { type: 'boolean', isRequired: true },
		durationMinutes: { type: 'number', isRequired: true },
		rightIcons: {
			type: 'select',
			isArray: true,
			options: {
				choices: lineIconChoices,
			},
		},
		leftIcons: {
			type: 'select',
			isArray: true,
			options: {
				choices: lineIconChoices,
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
			type: 'number',
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
		repeatsUntil: {
			type: 'number',
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
			type: 'number',
			isRequired: true,
		},
		exclusionDates: {
			type: 'schema',
			isArray: true,
			options: {
				schema: eventExclusionDateSchema,
			},
		},
		dateDeleted: {
			type: 'number',
		},
		dateCreated: {
			type: 'number',
			isRequired: true,
		},
	},
})

function buildDaysOfWeekChoices(): {
	value: string
	//@ts-ignore
	label: any
}[] {
	return Object.keys(daysOfWeek).map((r) => ({
		value: r,
		//@ts-ignore
		label: daysOfWeek[r],
	}))
}

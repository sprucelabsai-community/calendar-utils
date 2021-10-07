import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const eventTimeBlockSchemaSchema: SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlockSchemaSchema  = {
	id: 'eventTimeBlockSchema',
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

SchemaRegistry.getInstance().trackSchema(eventTimeBlockSchemaSchema)

export default eventTimeBlockSchemaSchema

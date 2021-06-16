import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const eventExclusionDateSchema: SpruceSchemas.Calendar.v2021_05_19.EventExclusionDateSchema  = {
	id: 'eventExclusionDate',
	version: 'v2021_05_19',
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

SchemaRegistry.getInstance().trackSchema(eventExclusionDateSchema)

export default eventExclusionDateSchema

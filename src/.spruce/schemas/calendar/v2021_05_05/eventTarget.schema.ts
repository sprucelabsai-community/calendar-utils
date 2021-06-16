import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const eventTargetSchema: SpruceSchemas.Calendar.v2021_05_05.EventTargetSchema  = {
	id: 'eventTarget',
	version: 'v2021_05_05',
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

SchemaRegistry.getInstance().trackSchema(eventTargetSchema)

export default eventTargetSchema

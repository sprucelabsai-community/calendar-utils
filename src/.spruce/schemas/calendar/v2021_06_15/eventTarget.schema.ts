import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const eventTargetSchema: SpruceSchemas.Calendar.v2021_06_15.EventTargetSchema  = {
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

SchemaRegistry.getInstance().trackSchema(eventTargetSchema)

export default eventTargetSchema

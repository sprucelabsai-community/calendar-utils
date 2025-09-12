import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const venueSchema: SpruceSchemas.CalendarUtils.v2021_05_19.VenueSchema  = {
	id: 'venue',
	version: 'v2021_05_19',
	namespace: 'CalendarUtils',
	name: 'Venue',
	moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils',
	    fields: {
	            /** . */
	            'provider': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'label': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'joinUrl': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'details': {
	                type: 'text',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(venueSchema)

export default venueSchema

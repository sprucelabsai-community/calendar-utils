import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const invalidTimezoneNameSchema: SpruceErrors.CalendarUtils.InvalidTimezoneNameSchema  = {
	id: 'invalidTimezoneName',
	namespace: 'CalendarUtils',
	name: 'Invalid timezone name',
	moduleToImportFromWhenRemote: '@sprucelabs/calendar-utils',
	    fields: {
	            /** . */
	            'name': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(invalidTimezoneNameSchema)

export default invalidTimezoneNameSchema

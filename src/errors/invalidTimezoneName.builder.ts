import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'invalidTimezoneName',
    name: 'Invalid timezone name',
    fields: {
        name: {
            type: 'text',
            isRequired: true,
        },
    },
})

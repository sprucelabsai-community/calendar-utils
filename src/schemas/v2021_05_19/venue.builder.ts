import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'venue',
    name: 'Venue',
    fields: {
        provider: {
            type: 'text',
            isRequired: true,
        },
        label: {
            type: 'text',
            isRequired: true,
        },
        joinUrl: {
            type: 'text',
        },
        details: {
            type: 'text',
        },
    },
})

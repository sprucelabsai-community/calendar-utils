import { cloneDeep, Schema, SchemaFieldNames } from '@sprucelabs/schema'
import { timezoneChoices } from '@sprucelabs/spruce-core-schemas'
import TimezoneChoiceSorter from '../locales/TimezoneChoiceSorter'
import { Locale } from '../types/calendar.types'

export default function sortTimezoneChoices<S extends Schema>(
	locale: Locale,
	schema: S,
	fieldName: SchemaFieldNames<S>
) {
	const sorter = new TimezoneChoiceSorter(locale)
	const choices = sorter.sort(timezoneChoices)

	const copy = cloneDeep(schema)

	//@ts-ignore
	copy.fields[fieldName].options.choices = choices

	return copy
}

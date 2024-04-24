import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface InvalidTimezoneNameErrorOptions extends SpruceErrors.CalendarUtils.InvalidTimezoneName, ISpruceErrorOptions {
	code: 'INVALID_TIMEZONE_NAME'
}

type ErrorOptions =  | InvalidTimezoneNameErrorOptions 

export default ErrorOptions

import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import { buildEventContract } from '@sprucelabs/mercury-types'
import { assertOptions, buildSchema, SelectChoice } from '@sprucelabs/schema'
import { timezoneChoices } from '@sprucelabs/spruce-core-schemas'
import { getTimezoneOffset } from 'date-fns-tz'
import SpruceError from '../errors/SpruceError'
import { Locale, TimezoneName } from '../types/calendar.types'
import TimezoneChoiceSorter from './TimezoneChoiceSorter'

export default class LocaleImpl
	extends AbstractEventEmitter<LocaleContract>
	implements Locale
{
	private offset = new Date().getTimezoneOffset() * -1
	private currentZone?: TimezoneName
	private timezoneChoices: SelectChoice[]

	public constructor() {
		super(localeContract)
		const sorter = new TimezoneChoiceSorter(this)
		this.timezoneChoices = sorter.sort(timezoneChoices as any)
	}

	public setTimezoneOffsetMinutes(offset: number): void {
		assertOptions({ offset }, ['offset'])
		this.offset = offset
	}

	public getTimezoneOffsetMinutes(onDate?: number): number {
		if (onDate) {
			return this.zoneNameToOffsetMinutes(this.getZoneName(), onDate)
		}
		return this.offset
	}

	public async setZoneName(zone: TimezoneName) {
		if (this.currentZone === zone) {
			return
		}

		this.currentZone = zone
		this.offset = this.zoneNameToOffsetMinutes(zone)

		await this.emit('did-change-timezones', {
			zoneName: zone,
		})
	}

	public getZoneName() {
		return (
			this.currentZone ??
			this.offsetMinutesToZoneName(this.getTimezoneOffsetMinutes())
		)
	}

	public offsetMinutesToZoneName(offset: number) {
		if (offset === 0) {
			return 'UTC'
		}

		return this.timezoneChoices
			.map((t) => t.value)
			.find((name) => {
				const o = this.zoneNameToOffsetMinutes(name as any)
				return o === offset
			}) as TimezoneName
	}

	public zoneNameToOffsetMinutes(name: TimezoneName, onDate?: number) {
		const results = getTimezoneOffset(name, onDate)
		if (isNaN(results)) {
			throw new SpruceError({
				code: 'INVALID_TIMEZONE_NAME',
				name,
			})
		}

		return results / 1000 / 60
	}
}

const localeContract = buildEventContract({
	eventSignatures: {
		['did-change-timezones']: {
			emitPayloadSchema: buildSchema({
				id: 'didChangeTimezonesPayload',
				fields: {
					zoneName: {
						type: 'text',
					},
				},
			}),
		},
	},
})

type LocaleContract = typeof localeContract

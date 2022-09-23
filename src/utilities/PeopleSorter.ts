import sortBy from 'lodash/sortBy'

export type Person = { id: string; casualName: string }
export type CalendarEvent = {
	id: string
	startDateTimeMs: number
	personId: string
}
export type SelectedEvent = Pick<CalendarEvent, 'id'>

export default class PeopleSorter {
	private _people?: Person[] = []
	private _events?: CalendarEvent[]
	private selectedEvents: SelectedEvent[] = []

	public setPeople(people: Person[]) {
		this._people = [...people]
	}
	public getPeople() {
		return this.people
	}

	public sort() {
		this.assertValid()

		let peopleSortResult: Person[] = []
		if (this.selectedEvents.length > 0 && this.events.length > 0) {
			let selectedEventsWithValidPeople = this.events.filter((e) => {
				const eventsMatch = this.selectedEvents.find((se) => se.id === e.id)
				const peopleMatch = this.people.find((p) => p.id === e.personId)
				if (peopleMatch && eventsMatch) {
					return true
				}
				return false
			})
			selectedEventsWithValidPeople = sortBy(selectedEventsWithValidPeople, [
				'startDateTimeMs',
			])
			const selectedPeopleWithValidEvents = selectedEventsWithValidPeople.map(
				(e) => {
					const match = this.people.find((p) => p.id === e.personId)
					if (match) {
						return match
					}
					return null
				}
			) as Person[]

			const nonSelectedPeople = this.people.filter((p) => {
				const match = selectedPeopleWithValidEvents.find(
					(sp) => sp?.id === p.id
				)
				if (match) {
					return false
				}
				return true
			})
			if (
				selectedPeopleWithValidEvents &&
				selectedPeopleWithValidEvents.length > 0
			) {
				peopleSortResult = selectedPeopleWithValidEvents
			}

			if (nonSelectedPeople && nonSelectedPeople.length > 0) {
				peopleSortResult = peopleSortResult.concat(
					sortBy(nonSelectedPeople, ['casualName'])
				)
			}
		} else {
			peopleSortResult = sortBy(this.people, ['casualName'])
		}

		return peopleSortResult
	}

	public setEvents(events: CalendarEvent[]) {
		this._events = [...events]
	}

	public getEvents() {
		return this.events
	}

	public setSelectedEvents(selectedEvents: Pick<CalendarEvent, 'id'>[]) {
		this.selectedEvents = [...selectedEvents]
	}

	public getSelectedEvents() {
		return this.selectedEvents
	}

	private assertValid() {
		if (!this._people) {
			throw new Error('People are not set for sorting')
		}

		if (!this.events) {
			throw new Error('Selected events are not set for sorting')
		}

		this.assertEventsAreValid()
		this.assertPeopleAreValid()
	}

	private assertEventsAreValid() {
		const eventIds = this.events.map((x) => x.id)

		const missingSelectedEventIds = this.selectedEvents
			.filter((k) => eventIds.indexOf(k.id) === -1)
			.map((e) => e.id)

		if (missingSelectedEventIds.length > 0) {
			throw new Error(
				`Selected event ids are not present in events list: [${missingSelectedEventIds.join(
					', '
				)}]`
			)
		}
	}

	private assertPeopleAreValid() {
		const eventsPersonIds = this.events.map((x) => x.personId)

		const personIds = this.people.map((x) => x.id)

		const missingPersonIds = eventsPersonIds.filter(
			(k) => personIds.indexOf(k) === -1
		)

		if (missingPersonIds.length > 0) {
			throw new Error(
				`Event person are not present in people list: [${missingPersonIds.join(
					', '
				)}]`
			)
		}
	}

	private get people(): Person[] {
		return this._people ?? []
	}
	private get events(): CalendarEvent[] {
		return this._events ?? []
	}
}

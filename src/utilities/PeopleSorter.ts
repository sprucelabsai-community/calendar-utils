import sortBy from 'lodash/sortBy'

export type Person = { id: string; casualName: string }
export type SorterCalendarEvent = {
	id: string
	groupId?: string
	startDateTimeMs: number
	personId: string
}

export default class PeopleSorter {
	private _people?: Person[] = []
	private _events?: SorterCalendarEvent[]
	private selectedEvents: string[] = []

	public setPeople(people: Person[]) {
		this._people = [...people]
	}
	public getPeople() {
		return this.people
	}

	public sort() {
		this.assertValid()

		let people: Person[] = []
		if (this.shouldSort()) {
			const selectedPeopleWithValidEvents =
				this.peopleWithSelectedEventsSortedByStartTime()

			const nonSelectedPeople = this.peopleExcluding(
				selectedPeopleWithValidEvents
			)

			if (
				selectedPeopleWithValidEvents &&
				selectedPeopleWithValidEvents.length > 0
			) {
				people = selectedPeopleWithValidEvents
			}

			if (nonSelectedPeople && nonSelectedPeople.length > 0) {
				people = people.concat(sortBy(nonSelectedPeople, ['casualName']))
			}
		} else {
			people = sortBy(this.people, ['casualName'])
		}

		return people
	}

	private peopleExcluding(selectedPeopleWithValidEvents: Person[]) {
		return this.people.filter((p) => {
			const match = selectedPeopleWithValidEvents.find((sp) => sp?.id === p.id)
			if (match) {
				return false
			}
			return true
		})
	}

	private shouldSort() {
		return this.selectedEvents.length > 0 && this.events.length > 0
	}

	private peopleWithSelectedEventsSortedByStartTime() {
		let selectedEvents = this.events.filter((e) => {
			const eventsMatch = this.selectedEvents.find((id) => id === e.id)
			const peopleMatch = this.people.find((p) => p.id === e.personId)

			if (peopleMatch && eventsMatch) {
				return true
			}
			return false
		})

		const groupsIds = selectedEvents.map((e) => e.groupId).filter((g) => !!g)

		const matchOnGroup =
			groupsIds.length > 0
				? this.events.filter(
						(e) =>
							!selectedEvents.find((se) => se.id === e.id) &&
							groupsIds.indexOf(e.groupId) > -1
				  )
				: []

		selectedEvents = sortBy(
			[...selectedEvents, ...matchOnGroup],
			['startDateTimeMs']
		)

		const people = selectedEvents.map((e) => {
			const match = this.people.find((p) => p.id === e.personId)
			if (match) {
				return match
			}
			return null
		}) as Person[]

		return people
	}

	public setEvents(events: SorterCalendarEvent[]) {
		this._events = [...events]
	}

	public getEvents() {
		return this.events
	}

	public setSelectedEvents(selectedEvents: string[]) {
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

		const missingSelectedEventIds = this.selectedEvents.filter(
			(id) => eventIds.indexOf(id) === -1
		)

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
	private get events(): SorterCalendarEvent[] {
		return this._events ?? []
	}
}

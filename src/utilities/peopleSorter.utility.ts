import * as _ from 'lodash'

export type Person = { id: string; casualName: string }
export type CalendarEvent = {
	id: string
	startDateTimeMs: number
	personId: string
}

const peopleSorterUtil = {
	people: [] as Person[],
	events: [] as CalendarEvent[],
	selectedEvents: [] as Pick<CalendarEvent, 'id'>[],

	setPeople(people: Person[]) {
		this.people = people
	},
	getPeople() {
		return this.people
	},

	sort() {
		if (this.selectedEvents.length > 0 && this.events.length > 0) {
			const filteredEvents = this.events.filter((e) => {
				const eventsMatch = this.selectedEvents.find((se) => se.id === e.id)
				const peopleMatch = this.people.find((p) => p.id === e.personId)
				if (peopleMatch && eventsMatch) {
					return true
				}
				return false
			})
			const sortedEvents = _.sortBy(filteredEvents, ['startDateTimeMs'])

			const sortedPeople = sortedEvents.map((e) => {
				const match = this.people.find((p) => p.id === e.personId)
				if (match) {
					return match
				}
				return null
			})

			const nonSortedPeople = this.people.filter((p) => {
				const match = sortedPeople.find((sp) => sp?.id === p.id)
				if (match) {
					return false
				}
				return true
			})
			if (sortedPeople && sortedPeople.length > 0) {
				this.people = sortedPeople
			}

			if (nonSortedPeople && nonSortedPeople.length > 0) {
				this.people.push(_.sortBy(nonSortedPeople, ['casualName']))
			}
		} else {
			this.people = _.sortBy(this.people, ['casualName'])
		}

		return this.people
	},

	setEvents(events: CalendarEvent[]) {
		this.events = events
	},

	getEvents() {
		return this.events
	},

	setSelectedEvents(selectedEvents: Pick<CalendarEvent, 'id'>[]) {
		this.selectedEvents = selectedEvents
	},

	getSelectedEvents() {
		return this.selectedEvents
	},
}

export default peopleSorterUtil

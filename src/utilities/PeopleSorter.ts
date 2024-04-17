import { SorterCalendarEvent } from '../types/calendar.types'

export default class PeopleSorter {
    private _people?: Person[]
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
                people = people.concat(sortByCasualName(nonSelectedPeople))
            }
        } else {
            people = sortByCasualName(this.people)
        }

        return people
    }

    private peopleExcluding(selectedPeopleWithValidEvents: Person[]) {
        return this.people.filter((p) => {
            const match = selectedPeopleWithValidEvents.find(
                (sp) => sp?.id === p.id
            )
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

        const groupsIds = selectedEvents
            .map((e) => e.groupId)
            .filter((g) => !!g)

        const matchOnGroup =
            groupsIds.length > 0
                ? this.events.filter(
                      (e) =>
                          !selectedEvents.find((se) => se.id === e.id) &&
                          groupsIds.indexOf(e.groupId) > -1
                  )
                : []

        selectedEvents = [...selectedEvents, ...matchOnGroup].sort(
            (a, b) => a.startDateTimeMs - b.startDateTimeMs
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
            throw new Error('People are not set for sorting!')
        }

        if (!this.events) {
            throw new Error('Selected events are not set for sorting')
        }

        this.assertEventsAreValid()
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

    private get people(): Person[] {
        return this._people ?? []
    }
    private get events(): SorterCalendarEvent[] {
        return this._events ?? []
    }
}

export interface Person {
    id: string
    casualName: string
}

function sortByCasualName(people: Person[]) {
    return people.sort((a, b) => {
        return a.casualName < b.casualName ? -1 : 1
    })
}

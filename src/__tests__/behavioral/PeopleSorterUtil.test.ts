import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { default as PeopleSorter } from '../../utilities/PeopleSorter'

export default class PeopleSorterUtilTest extends AbstractSpruceTest {
	private static peopleSorterUtil: PeopleSorter
	protected static async beforeEach() {
		this.peopleSorterUtil = new PeopleSorter()
		this.peopleSorterUtil.setEvents([])
		this.peopleSorterUtil.setSelectedEvents([])
		this.peopleSorterUtil.setPeople([])
	}
	@test()
	protected static canCreatePeopleSorterUtility() {
		assert.isTruthy(this.peopleSorterUtil)
	}

	@test()
	protected static async hasSetPeopleMethod() {
		assert.isFunction(this.peopleSorterUtil.setPeople)
	}

	@test()
	protected static async hasGetPeopleMethod() {
		assert.isFunction(this.peopleSorterUtil.getPeople)
	}

	@test()
	protected static canProvidePeopleForSorting() {
		const teammates = [{ id: '111', casualName: 'Test' }]
		this.peopleSorterUtil.setPeople(teammates)

		const people = this.peopleSorterUtil.getPeople()
		assert.isLength(people, 1)
		assert.isEqual(people?.[0]?.id, '111')
	}

	@test()
	protected static async hasSortMethod() {
		assert.isFunction(this.peopleSorterUtil.sort)
	}

	@test()
	protected static async sortReturnPeopleForStart() {
		const teammates = [
			{ id: '111', casualName: 'ATest' },
			{ id: '222', casualName: 'BTest' },
		]

		this.peopleSorterUtil.setPeople(teammates)
		const sortedPeople = this.peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 2)
		assert.isEqual(sortedPeople?.[0]?.id, '111')
	}

	@test()
	protected static async sortReturnsPeopleOrderedByCasualNameIfNoEventsProvided() {
		const teammates = [
			{ id: '111', casualName: 'B Test' },
			{ id: '222', casualName: 'A Test' },
		]

		this.peopleSorterUtil.setPeople(teammates)
		const sortedPeople = this.peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 2)
		assert.isEqual(sortedPeople?.[0]?.id, '222')
	}

	@test()
	protected static async hasSetEventsMethod() {
		assert.isFunction(this.peopleSorterUtil.setEvents)
	}

	@test()
	protected static async hasGetEventsMethod() {
		assert.isFunction(this.peopleSorterUtil.getEvents)
	}

	@test()
	protected static canProvideEventsForSorting() {
		this.peopleSorterUtil.setEvents([
			{ id: '111', startDateTimeMs: 1641993534, personId: '222' },
		])

		const events = this.peopleSorterUtil.getEvents()
		assert.isLength(events, 1)
		assert.isEqual(events?.[0]?.id, '111')
	}

	@test()
	protected static async sortingThrowsIfPeopleAreSetAndEventsSetWithoutSelectedEvents() {
		this.peopleSorterUtil.setPeople([
			{ id: '111', casualName: 'B Test' },
			{ id: '222', casualName: 'A Test' },
		])
		this.peopleSorterUtil.setEvents([
			{ id: '111', startDateTimeMs: 1641993534, personId: '111' },
			{ id: '222', startDateTimeMs: 1641993848, personId: '222' },
		])
		await assert.doesThrowAsync(() => this.peopleSorterUtil.sort())
	}

	@test()
	protected static async hasSetSelectedEventIdsMethod() {
		assert.isFunction(this.peopleSorterUtil.setSelectedEvents)
	}

	@test()
	protected static async hasGetSelectedEventIdsMethod() {
		assert.isFunction(this.peopleSorterUtil.getSelectedEvents)
	}

	@test()
	protected static canProvideSelectedEventsForSorting() {
		this.peopleSorterUtil.setSelectedEvents([{ id: '111' }])

		const events = this.peopleSorterUtil.getSelectedEvents()
		assert.isLength(events, 1)
		assert.isEqual(events?.[0]?.id, '111')
	}

	@test()
	protected static async sortingThrowsIfPeopleSetAndSelectedEventsSetWithoutEvents() {
		this.peopleSorterUtil.setPeople([
			{ id: 'person111', casualName: 'B Test' },
			{ id: 'person222', casualName: 'A Test' },
		])

		this.peopleSorterUtil.setSelectedEvents([{ id: 'event111' }])

		await assert.doesThrowAsync(() => this.peopleSorterUtil.sort())
	}

	@test()
	protected static async canSortPeopleByEventStartDateIfSelectedEventsAreSet() {
		this.peopleSorterUtil.setPeople([
			{ id: 'person111', casualName: 'B Test' },
			{ id: 'person222', casualName: 'A Test' },
		])

		this.peopleSorterUtil.setEvents([
			{ id: 'event111', startDateTimeMs: 1641993534, personId: 'person111' },
			{ id: 'event222', startDateTimeMs: 1641993848, personId: 'person222' },
		])
		this.peopleSorterUtil.setSelectedEvents([
			{ id: 'event111' },
			{ id: 'event222' },
		])
		const sortedPeople = this.peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 2)
		assert.isEqual(sortedPeople?.[0]?.id, 'person111')
	}

	@test()
	protected static async canSortPeopleByEventStartDateIfSelectedEventsAreSetForTwoPersonOutOfTree() {
		this.peopleSorterUtil.setPeople([
			{ id: 'person111', casualName: 'C Test' },
			{ id: 'person222', casualName: 'B Test' },
			{ id: 'person333', casualName: 'A Test' },
		])

		this.peopleSorterUtil.setEvents([
			{ id: 'event111', startDateTimeMs: 1641993534, personId: 'person111' },
			{ id: 'event222', startDateTimeMs: 1641993848, personId: 'person222' },
			{ id: 'event333', startDateTimeMs: 1641993833, personId: 'person333' },
		])
		this.peopleSorterUtil.setSelectedEvents([
			{ id: 'event111' },
			{ id: 'event222' },
		])
		const sortedPeople = this.peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 3)
		assert.isEqual(sortedPeople?.[0]?.id, 'person111')
	}

	@test()
	protected static async cantSortIfPeopleAreNotSet() {
		this.peopleSorterUtil.setEvents([
			{ id: 'event111', startDateTimeMs: 1641993534, personId: 'person111' },
			{ id: 'event222', startDateTimeMs: 1641993848, personId: 'person222' },
			{ id: 'event333', startDateTimeMs: 1641993833, personId: 'person333' },
		])
		this.peopleSorterUtil.setSelectedEvents([
			{ id: 'event111' },
			{ id: 'event222' },
		])
		await assert.doesThrowAsync(() => this.peopleSorterUtil.sort())
	}

	@test()
	protected static async cantSortIfPersonIsMissgingInEventsList() {
		this.peopleSorterUtil.setPeople([
			{ id: 'person111', casualName: 'C Test' },
			{ id: 'person222', casualName: 'B Test' },
			{ id: 'person333', casualName: 'A Test' },
		])

		this.peopleSorterUtil.setEvents([
			{ id: 'event111', startDateTimeMs: 1641993534, personId: 'person111' },
			{ id: 'event222', startDateTimeMs: 1641993848, personId: 'person222' },
			{ id: 'event444', startDateTimeMs: 1641993833, personId: 'person444' },
		])
		this.peopleSorterUtil.setSelectedEvents([
			{ id: 'event111' },
			{ id: 'event444' },
			{ id: 'event222' },
		])
		await assert.doesThrowAsync(() => this.peopleSorterUtil.sort())
	}

	@test()
	protected static async canSortByEventStartDateAndPeopleCasualName() {
		this.peopleSorterUtil.setPeople([
			{ id: 'person111', casualName: 'C Test' },
			{ id: 'person222', casualName: 'K Test' },
			{ id: 'person333', casualName: 'A Test' },
			{ id: 'person444', casualName: 'B Test' },
		])

		this.peopleSorterUtil.setEvents([
			{ id: 'event111', startDateTimeMs: 1641993534, personId: 'person111' },
			{ id: 'event333', startDateTimeMs: 1641993839, personId: 'person333' },
			{ id: 'event444', startDateTimeMs: 1641993831, personId: 'person444' },
		])
		this.peopleSorterUtil.setSelectedEvents([
			{ id: 'event111' },
			{ id: 'event333' },
		])

		const sortedPeople = this.peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 4)
		assert.isEqual(sortedPeople?.[0]?.casualName, 'C Test')
		assert.isEqual(sortedPeople?.[1]?.casualName, 'A Test')
		assert.isEqual(sortedPeople?.[2]?.casualName, 'B Test')
		assert.isEqual(sortedPeople?.[3]?.casualName, 'K Test')
	}

	@test()
	protected static async canSortByEventStartDate() {
		this.peopleSorterUtil.setPeople([
			{ id: 'person111', casualName: 'C Test' },
			{ id: 'person222', casualName: 'K Test' },
			{ id: 'person333', casualName: 'A Test' },
			{ id: 'person444', casualName: 'B Test' },
		])

		this.peopleSorterUtil.setEvents([
			{ id: 'event111', startDateTimeMs: 1641993534, personId: 'person111' },
			{ id: 'event222', startDateTimeMs: 1641993840, personId: 'person222' },
			{ id: 'event333', startDateTimeMs: 1641993839, personId: 'person333' },
			{ id: 'event444', startDateTimeMs: 1641993831, personId: 'person444' },
		])
		this.peopleSorterUtil.setSelectedEvents([
			{ id: 'event111' },
			{ id: 'event333' },
			{ id: 'event222' },
			{ id: 'event444' },
		])

		const sortedPeople = this.peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 4)
		assert.isEqual(sortedPeople?.[0]?.casualName, 'C Test')
		assert.isEqual(sortedPeople?.[1]?.casualName, 'B Test')
		assert.isEqual(sortedPeople?.[2]?.casualName, 'A Test')
		assert.isEqual(sortedPeople?.[3]?.casualName, 'K Test')
	}

	@test()
	protected static async canClearSelectedEvents() {
		this.peopleSorterUtil.setPeople([
			{ id: 'person111', casualName: 'C Test' },
			{ id: 'person222', casualName: 'K Test' },
			{ id: 'person333', casualName: 'A Test' },
			{ id: 'person444', casualName: 'B Test' },
		])

		this.peopleSorterUtil.setSelectedEvents([])
		const selectedEvents = this.peopleSorterUtil.getSelectedEvents()
		assert.isLength(selectedEvents, 0)

		const sortedPeople = this.peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 4)
		assert.isEqual(sortedPeople?.[0]?.casualName, 'A Test')
		assert.isEqual(sortedPeople?.[1]?.casualName, 'B Test')
		assert.isEqual(sortedPeople?.[2]?.casualName, 'C Test')
		assert.isEqual(sortedPeople?.[3]?.casualName, 'K Test')
	}
}

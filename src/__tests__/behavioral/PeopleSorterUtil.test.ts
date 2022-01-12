import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import peopleSorterUtil from '../../utilities/peopleSorter.utility'

export default class PeopleSorterUtilTest extends AbstractSpruceTest {
	protected static async beforeEach() {
		peopleSorterUtil.setEvents([])
		peopleSorterUtil.setSelectedEvents([])
		peopleSorterUtil.setPeople([])
	}
	@test()
	protected static canCreatePeopleSorterUtility() {
		assert.isTruthy(peopleSorterUtil)
	}

	@test()
	protected static async hasSetPeopleMethod() {
		assert.isFunction(peopleSorterUtil.setPeople)
	}

	@test()
	protected static async hasGetPeopleMethod() {
		assert.isFunction(peopleSorterUtil.getPeople)
	}
	@test()
	protected static canProvidePeopleForSorting() {
		const teammates = [{ id: '111', casualName: 'Test' }]
		peopleSorterUtil.setPeople(teammates)

		const people = peopleSorterUtil.getPeople()
		assert.isLength(people, 1)
		assert.isEqual(people?.[0]?.id, '111')
	}

	@test()
	protected static async hasSortMethod() {
		assert.isFunction(peopleSorterUtil.sort)
	}

	@test()
	protected static async sortReturnPeopleForStart() {
		const teammates = [
			{ id: '111', casualName: 'ATest' },
			{ id: '222', casualName: 'BTest' },
		]

		peopleSorterUtil.setPeople(teammates)
		const sortedPeople = peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 2)
		assert.isEqual(sortedPeople?.[0]?.id, '111')
	}

	@test()
	protected static async sortReturnsEmptyArrayIfZeroPeopleProvided() {
		peopleSorterUtil.setPeople([])
		const sortedPeople = peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 0)
	}

	@test()
	protected static async sortReturnsPeopleOrderedByCasualNameIfNoEventsProvided() {
		const teammates = [
			{ id: '111', casualName: 'B Test' },
			{ id: '222', casualName: 'A Test' },
		]

		peopleSorterUtil.setPeople(teammates)
		const sortedPeople = peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 2)
		assert.isEqual(sortedPeople?.[0]?.id, '222')
	}

	@test()
	protected static async hasSetEventsMethod() {
		assert.isFunction(peopleSorterUtil.setEvents)
	}

	@test()
	protected static async hasGetEventsMethod() {
		assert.isFunction(peopleSorterUtil.getEvents)
	}

	@test()
	protected static canProvideEventsForSorting() {
		peopleSorterUtil.setEvents([
			{ id: '111', startDateTimeMs: 1641993534, personId: '222' },
		])

		const events = peopleSorterUtil.getEvents()
		assert.isLength(events, 1)
		assert.isEqual(events?.[0]?.id, '111')
	}

	@test()
	protected static async sortReturnsPeopleOrderedByCasualNameIfEventsSetWithoutSelectedEvents() {
		peopleSorterUtil.setPeople([
			{ id: '111', casualName: 'B Test' },
			{ id: '222', casualName: 'A Test' },
		])
		peopleSorterUtil.setEvents([
			{ id: '111', startDateTimeMs: 1641993534, personId: '111' },
			{ id: '222', startDateTimeMs: 1641993848, personId: '222' },
		])
		const sortedPeople = peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 2)
		assert.isEqual(sortedPeople?.[0]?.id, '222')
	}

	@test()
	protected static async hasSetSelectedEventIdsMethod() {
		assert.isFunction(peopleSorterUtil.setSelectedEvents)
	}

	@test()
	protected static async hasGetSelectedEventIdsMethod() {
		assert.isFunction(peopleSorterUtil.getSelectedEvents)
	}

	@test()
	protected static canProvideSelectedEventsForSorting() {
		peopleSorterUtil.setSelectedEvents([{ id: '111' }])

		const events = peopleSorterUtil.getSelectedEvents()
		assert.isLength(events, 1)
		assert.isEqual(events?.[0]?.id, '111')
	}

	@test()
	protected static async sortReturnsPeopleOrderedByCasualNameIfSelectedEventsSetWithoutEvents() {
		peopleSorterUtil.setPeople([
			{ id: 'person111', casualName: 'B Test' },
			{ id: 'person222', casualName: 'A Test' },
		])

		peopleSorterUtil.setSelectedEvents([{ id: 'event111' }])

		const sortedPeople = peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 2)
		assert.isEqual(sortedPeople?.[0]?.id, 'person222')
	}

	@test()
	protected static async canSortPeopleByEventStartDateIfSelectedEventsAreSet() {
		peopleSorterUtil.setPeople([
			{ id: 'person111', casualName: 'B Test' },
			{ id: 'person222', casualName: 'A Test' },
		])

		peopleSorterUtil.setEvents([
			{ id: 'event111', startDateTimeMs: 1641993534, personId: 'person111' },
			{ id: 'event222', startDateTimeMs: 1641993848, personId: 'person222' },
		])
		peopleSorterUtil.setSelectedEvents([{ id: 'event111' }, { id: 'event222' }])
		const sortedPeople = peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 2)
		assert.isEqual(sortedPeople?.[0]?.id, 'person111')
	}

	@test()
	protected static async canSortPeopleByEventStartDateIfSelectedEventsAreSetForTwoPersonOutOfTree() {
		peopleSorterUtil.setPeople([
			{ id: 'person111', casualName: 'C Test' },
			{ id: 'person222', casualName: 'B Test' },
			{ id: 'person333', casualName: 'A Test' },
		])

		peopleSorterUtil.setEvents([
			{ id: 'event111', startDateTimeMs: 1641993534, personId: 'person111' },
			{ id: 'event222', startDateTimeMs: 1641993848, personId: 'person222' },
			{ id: 'event333', startDateTimeMs: 1641993833, personId: 'person333' },
		])
		peopleSorterUtil.setSelectedEvents([{ id: 'event111' }, { id: 'event222' }])
		const sortedPeople = peopleSorterUtil.sort()

		assert.isLength(sortedPeople, 3)
		assert.isEqual(sortedPeople?.[0]?.id, 'person111')
	}
}

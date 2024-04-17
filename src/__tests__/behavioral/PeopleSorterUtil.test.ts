import AbstractSpruceTest, {
    test,
    assert,
    generateId,
} from '@sprucelabs/test-utils'
import { default as PeopleSorter } from '../../utilities/PeopleSorter'

export default class PeopleSorterUtilTest extends AbstractSpruceTest {
    private static sorter: PeopleSorter
    protected static async beforeEach() {
        this.sorter = new PeopleSorter()
        this.sorter.setEvents([])
        this.sorter.setSelectedEvents([])
        this.sorter.setPeople([])
    }
    @test()
    protected static canCreatePeopleSorterUtility() {
        assert.isTruthy(this.sorter)
    }

    @test()
    protected static async hasSetPeopleMethod() {
        assert.isFunction(this.sorter.setPeople)
    }

    @test()
    protected static async hasGetPeopleMethod() {
        assert.isFunction(this.sorter.getPeople)
    }

    @test()
    protected static canProvidePeopleForSorting() {
        const teammates = [{ id: '111', casualName: 'Test' }]
        this.sorter.setPeople(teammates)

        const people = this.sorter.getPeople()
        assert.isLength(people, 1)
        assert.isEqual(people?.[0]?.id, '111')
    }

    @test()
    protected static async hasSortMethod() {
        assert.isFunction(this.sorter.sort)
    }

    @test()
    protected static async sortReturnPeopleForStart() {
        const teammates = [
            { id: '111', casualName: 'ATest' },
            { id: '222', casualName: 'BTest' },
        ]

        this.sorter.setPeople(teammates)
        const sortedPeople = this.sorter.sort()

        assert.isLength(sortedPeople, 2)
        assert.isEqual(sortedPeople?.[0]?.id, '111')
    }

    @test()
    protected static async sortReturnsPeopleOrderedByCasualNameIfNoEventsProvided() {
        const teammates = [
            { id: '111', casualName: 'B Test' },
            { id: '222', casualName: 'A Test' },
        ]

        this.sorter.setPeople(teammates)
        const sortedPeople = this.sorter.sort()

        assert.isLength(sortedPeople, 2)
        assert.isEqual(sortedPeople?.[0]?.id, '222')
    }

    @test()
    protected static async hasSetEventsMethod() {
        assert.isFunction(this.sorter.setEvents)
    }

    @test()
    protected static async hasGetEventsMethod() {
        assert.isFunction(this.sorter.getEvents)
    }

    @test()
    protected static canProvideEventsForSorting() {
        this.sorter.setEvents([
            { id: '111', startDateTimeMs: 1641993534, personId: '222' },
        ])

        const events = this.sorter.getEvents()
        assert.isLength(events, 1)
        assert.isEqual(events?.[0]?.id, '111')
    }

    @test()
    protected static async hasSetSelectedEventIdsMethod() {
        assert.isFunction(this.sorter.setSelectedEvents)
    }

    @test()
    protected static async hasGetSelectedEventIdsMethod() {
        assert.isFunction(this.sorter.getSelectedEvents)
    }

    @test()
    protected static canProvideSelectedEventsForSorting() {
        this.sorter.setSelectedEvents(['111'])

        const events = this.sorter.getSelectedEvents()

        assert.isLength(events, 1)
        assert.isEqual(events?.[0], '111')
    }

    @test()
    protected static async sortingThrowsIfPeopleSetAndSelectedEventsSetWithoutEvents() {
        this.sorter.setPeople([
            { id: 'person111', casualName: 'B Test' },
            { id: 'person222', casualName: 'A Test' },
        ])

        this.sorter.setSelectedEvents(['event111'])

        await assert.doesThrowAsync(() => this.sorter.sort())
    }

    @test()
    protected static async canSortPeopleByEventStartDateIfSelectedEventsAreSet() {
        this.sorter.setPeople([
            { id: 'person111', casualName: 'B Test' },
            { id: 'person222', casualName: 'A Test' },
        ])

        this.sorter.setEvents([
            {
                id: 'event111',
                startDateTimeMs: 1641993534,
                personId: 'person111',
            },
            {
                id: 'event222',
                startDateTimeMs: 1641993848,
                personId: 'person222',
            },
        ])
        this.sorter.setSelectedEvents(['event111', 'event222'])
        const sortedPeople = this.sorter.sort()

        assert.isLength(sortedPeople, 2)
        assert.isEqual(sortedPeople?.[0]?.id, 'person111')
    }

    @test()
    protected static async canSortPeopleByEventStartDateIfSelectedEventsAreSetForTwoPersonOutOfTree() {
        this.sorter.setPeople([
            { id: 'person111', casualName: 'C Test' },
            { id: 'person222', casualName: 'B Test' },
            { id: 'person333', casualName: 'A Test' },
        ])

        this.sorter.setEvents([
            {
                id: 'event111',
                startDateTimeMs: 1641993534,
                personId: 'person111',
            },
            {
                id: 'event222',
                startDateTimeMs: 1641993848,
                personId: 'person222',
            },
            {
                id: 'event333',
                startDateTimeMs: 1641993833,
                personId: 'person333',
            },
        ])
        this.sorter.setSelectedEvents(['event111', 'event222'])
        const sortedPeople = this.sorter.sort()

        assert.isLength(sortedPeople, 3)
        assert.isEqual(sortedPeople?.[0]?.id, 'person111')
    }

    @test()
    protected static async cantSortIfPeopleAreNotSet() {
        this.sorter = new PeopleSorter()
        this.sorter.setEvents([
            {
                id: 'event111',
                startDateTimeMs: 1641993534,
                personId: 'person111',
            },
            {
                id: 'event222',
                startDateTimeMs: 1641993848,
                personId: 'person222',
            },
            {
                id: 'event333',
                startDateTimeMs: 1641993833,
                personId: 'person333',
            },
        ])

        this.sorter.setSelectedEvents(['event111', 'event222'])
        await assert.doesThrowAsync(() => this.sorter.sort())
    }

    @test()
    protected static async canSortByEventStartDateAndPeopleCasualName() {
        this.sorter.setPeople([
            { id: 'person111', casualName: 'C Test' },
            { id: 'person222', casualName: 'K Test' },
            { id: 'person333', casualName: 'A Test' },
            { id: 'person444', casualName: 'B Test' },
        ])

        this.sorter.setEvents([
            {
                id: 'event111',
                startDateTimeMs: 1641993534,
                personId: 'person111',
            },
            {
                id: 'event333',
                startDateTimeMs: 1641993839,
                personId: 'person333',
            },
            {
                id: 'event444',
                startDateTimeMs: 1641993831,
                personId: 'person444',
            },
        ])

        this.sorter.setSelectedEvents(['event111', 'event333'])

        this.assertResults(['C Test', 'A Test', 'B Test', 'K Test'])
    }

    @test()
    protected static async canSortByEventStartDate() {
        this.sorter.setPeople([
            { id: 'person111', casualName: 'C Test' },
            { id: 'person222', casualName: 'K Test' },
            { id: 'person333', casualName: 'A Test' },
            { id: 'person444', casualName: 'B Test' },
        ])

        this.sorter.setEvents([
            {
                id: 'event111',
                startDateTimeMs: 1641993534,
                personId: 'person111',
            },
            {
                id: 'event222',
                startDateTimeMs: 1641993840,
                personId: 'person222',
            },
            {
                id: 'event333',
                startDateTimeMs: 1641993839,
                personId: 'person333',
            },
            {
                id: 'event444',
                startDateTimeMs: 1641993831,
                personId: 'person444',
            },
        ])
        this.sorter.setSelectedEvents([
            'event111',
            'event333',
            'event222',
            'event444',
        ])

        this.assertResults(['C Test', 'B Test', 'A Test', 'K Test'])
    }

    @test()
    protected static async canClearSelectedEvents() {
        this.sorter.setPeople([
            { id: 'person111', casualName: 'C Test' },
            { id: 'person222', casualName: 'K Test' },
            { id: 'person333', casualName: 'A Test' },
            { id: 'person444', casualName: 'B Test' },
        ])

        this.sorter.setSelectedEvents([])
        const selectedEvents = this.sorter.getSelectedEvents()
        assert.isLength(selectedEvents, 0)

        this.assertResults(['A Test', 'B Test', 'C Test', 'K Test'])
    }

    @test()
    protected static sortsPeopleWhenGroupMatches() {
        this.set4People()

        const groupId = generateId()

        this.sorter.setEvents([
            {
                id: '1',
                groupId,
                personId: 'd',
                startDateTimeMs: 0,
            },
            {
                id: '2',
                groupId,
                personId: 'a',
                startDateTimeMs: 1,
            },
        ])

        this.sorter.setSelectedEvents(['2'])

        this.assertResults(['d', 'a', 'b', 'c'])
    }

    @test()
    protected static async matchesGroup() {
        this.set4People()
        this.sorter.setEvents([
            {
                id: '1',
                groupId: '2',
                personId: 'b',
                startDateTimeMs: 0,
            },
            {
                id: '2',
                groupId: '1',
                personId: 'a',
                startDateTimeMs: 1,
            },
        ])

        this.sorter.setSelectedEvents(['2'])

        this.assertResults(['a', 'b', 'c', 'd'])
    }

    @test()
    protected static async canMatchGroupFromSecondSelectedEvent() {
        this.set4People()
        this.sorter.setEvents([
            {
                id: '1',
                groupId: '2',
                personId: 'b',
                startDateTimeMs: 0,
            },
            {
                id: '2',
                groupId: '1',
                personId: 'd',
                startDateTimeMs: 1,
            },
            {
                id: '3',
                groupId: '1',
                personId: 'c',
                startDateTimeMs: -1,
            },
        ])

        this.sorter.setSelectedEvents(['1', '3'])

        this.assertResults(['c', 'b', 'd', 'a'])
    }

    @test()
    protected static async worksAsExpectedWithEventPointingToBadPerson() {
        this.set4People()
        this.sorter.setEvents([
            {
                id: '1',
                groupId: '2',
                personId: '123123',
                startDateTimeMs: 0,
            },
            {
                id: '2',
                groupId: '1',
                personId: 'd',
                startDateTimeMs: 1,
            },
            {
                id: '3',
                groupId: '1',
                personId: 'c',
                startDateTimeMs: -1,
            },
        ])

        this.sorter.setSelectedEvents(['3'])

        this.assertResults(['c', 'd', 'a', 'b'])
    }

    private static set4People() {
        this.sorter.setPeople([
            { id: 'c', casualName: 'c' },
            { id: 'd', casualName: 'd' },
            { id: 'a', casualName: 'a' },
            { id: 'b', casualName: 'b' },
        ])
    }

    private static assertResults(expected: string[]) {
        const sortedPeople = this.sorter.sort()

        expected.forEach((name, idx) => {
            assert.isEqual(sortedPeople?.[idx]?.casualName, name)
        })
        return sortedPeople
    }
}

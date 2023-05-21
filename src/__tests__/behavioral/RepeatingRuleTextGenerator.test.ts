import AbstractSpruceTest, {
	test,
	assert,
	errorAssert,
} from '@sprucelabs/test-utils'
import { tomorrowLunch } from '../../dates'
import { CalendarEvent, DayOfWeek, Repeats } from '../../types/calendar.types'
import dateUtil from '../../utilities/date.utility'
import RepeatingRuleTextGenerator from '../../utilities/RepeatingRuleTextGenerator'
import generateEventValues from './generateEventValues'

export default class RepeatingRuleTextGeneratorTest extends AbstractSpruceTest {
	private static generator: RepeatingRuleTextGenerator

	protected static async beforeEach() {
		await super.beforeEach()
		this.generator = RepeatingRuleTextGenerator.Generator({
			dates: dateUtil,
		})
	}

	@test()
	protected static async throwsWithMissing() {
		//@ts-ignore
		const err = assert.doesThrow(() => RepeatingRuleTextGenerator.Generator())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['dates'],
		})
	}

	@test()
	protected static async rendersEmptyStringForEventWithNoRepeating() {
		this.assertGenerates({}, '')
	}

	@test('repeats daily forever', 'daily')
	@test('repeats weekly forever', 'weekly')
	@test('repeats monthly forever', 'monthly')
	protected static async generatesWithDailyForever(repeats: Repeats) {
		this.assertGenerates(
			{
				repeats,
				interval: 1,
			},
			`Repeats ${repeats} forever.`
		)
	}

	@test('repeats every 2 days', 2, 'daily', 'days')
	@test('repeats every 3 days', 3, 'daily', 'days')
	@test('repeats every 2 weeks', 2, 'weekly', 'weeks')
	protected static async repeatsOnIntervalForever(
		interval: number,
		repeats: Repeats,
		unit: string
	) {
		this.assertGenerates(
			{
				repeats,
				interval,
			},
			`Repeats every ${interval} ${unit} forever.`
		)
	}

	@test('renders days of the week', ['mon'], 'Mondays')
	@test('renders days of the week', ['mon', 'tue'], 'Mondays, Tuesdays')
	protected static async repeatsOnDayOfWeek(
		daysOfWeek: DayOfWeek[],
		rendered: string
	) {
		this.assertGenerates(
			{
				repeats: 'weekly',
				daysOfWeek,
			},
			`Repeats weekly on ${rendered} forever.`
		)
	}

	@test('daily for 10 times', 'daily', 10)
	@test('weekly for 10 times', 'weekly', 10)
	protected static async rendersOccurrances(
		repeats: Repeats,
		occurrences: number
	) {
		this.assertGenerates(
			{
				repeats,
				occurrences,
				nthInRepeating: 0,
			},
			`Repeats ${repeats} for ${occurrences} times.`
		)
	}

	@test()
	protected static async daysOfWeekWithTotalOccurrences() {
		this.assertGenerates(
			{
				repeats: 'weekly',
				daysOfWeek: ['mon'],
				occurrences: 5,
			},
			`Repeats weekly on Mondays for 5 times.`
		)
	}

	@test('renders until 1', tomorrowLunch())
	@test('renders until 2', dateUtil.addDays(new Date().getTime(), 3))
	protected static async rendersUntil(date: number) {
		const until = dateUtil.formatDate(date)
		this.assertGenerates(
			{
				repeats: 'weekly',
				repeatsUntil: date,
				nthInRepeating: 0,
			},
			`Repeats weekly until ${until}.`
		)
	}

	@test()
	protected static async activeUntilDateBeatsOccurrences() {
		const date = tomorrowLunch()
		const until = dateUtil.formatDate(date)
		this.assertGenerates(
			{
				repeats: 'weekly',
				occurrences: 10,
				activeUntilDate: date,
			},
			`Repeats weekly until ${until}.`
		)
	}

	@test()
	protected static async activeUntilBeatsRepeatsUntil() {
		const date = tomorrowLunch()
		const until = dateUtil.formatDate(date)
		this.assertGenerates(
			{
				repeats: 'weekly',
				repeatsUntil: dateUtil.addDays(date, 1),
				activeUntilDate: date,
			},
			`Repeats weekly until ${until}.`
		)
	}

	private static assertGenerates(
		values: Partial<CalendarEvent>,
		expected: string
	) {
		const event = generateEventValues(values)
		const rendered = this.generator.generate(event)
		assert.isEqual(rendered, expected)
	}
}

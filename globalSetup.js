module.exports = async () => {
	const timezones = [
		'Australia/Adelaide',
		'Brazil/East',
		'Europe/London',
		'US/Eastern',
		'US/Pacific',
		'UTC',
	]
	const tzIndex = process.env.TEST_TZ_INDEX
		? parseInt(process.env.TEST_TZ_INDEX)
		: 0

	process.env.TZ = timezones[tzIndex]
	console.log(`Running tests in ${process.env.TZ} timezone`)
}

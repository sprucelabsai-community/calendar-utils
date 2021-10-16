module.exports = async () => {
	const timezones = [
		'Australia/Adelaide',
		'Brazil/East',
		'Europe/London',
		'US/Eastern',
		'US/Pacific',
		'UTC',
	]
	process.env.TZ = timezones[Math.round(Math.random() * timezones.length)]
}

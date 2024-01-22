export const firstOfTheMonth = (date) => {
	const rv = new Date(date)
	rv.setDate(1)
	return rv
}
export const getMonthDays = (date, offset) => {
	return (new Date(date.getFullYear(), date.getMonth() + 1 + offset, 0)).getDate()
}
export const nextMonth = (date) => {
	return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0, 0, 0)
}
export const prevMonth = (date) => {
	return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(), 0, 0, 0, 0)
}
export const nextWeek = (date) => {
	const rv = new Date(date)
	rv.setDate(rv.getDate() + 7)
	return rv
}
export const prevWeek = (date) => {
	const rv = new Date(date)
	rv.setDate(rv.getDate() - 7)
	return rv
}
export const getNormalizedDay = (date) => {
	return date.getDay() == 0 ? 7 : date.getDay()
}
export const isSameDay = (date1, date2) => {
	return date1.getFullYear() == date2.getFullYear()
		&& date1.getMonth() == date2.getMonth()
		&& date1.getDate() == date2.getDate()
}
//ritorna la data che corrisponde alle 00:00 del lunedì della settimana di date
export const getMonday = (date) => {
	const tmpDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
	tmpDate.setDate(tmpDate.getDate() - getNormalizedDay(tmpDate) + 1)
	return tmpDate
}

export const isSameWeek = (date1, date2) => {
	const monday = getMonday(date1)
	const nextMonday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 7, 0, 0, 0, 0)

	return date2 >= monday && date2 < nextMonday
}

export const differenceInDays = (date1, date2) => {
	return Math.floor((Math.abs(date1 - date2)) / (1000 * 60 * 60 * 24));
}

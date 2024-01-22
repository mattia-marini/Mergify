import { differenceInDays} from "../utils/Date"
class Event {

	constructor(year, month, day, startH, startM, endH, endM, description = "Unknown") {
		if (arguments.length >= 7) {
			this.startDate = new Date(year, month, day, startH, startM, 0, 0)
			this.endDate = new Date(year, month, day, endH, endM, 0, 0)
			this.description = description
		}
		else { 
			this.startDate = new Date (year)
			this.endDate = new Date (month)
			this.description = day
		}
	}

	equals(e2) {
		return this.endDate.getTime() == e2.endDate.getTime() && this.startDate.getTime() == e2.startDate.getTime()
	}
/*
	constructor(startDate, endDate, description = "Unknown") {
		this.startDate = startDate
		this.endDate = endDate
		this.description = description
	}
	*/

}

export const splitEvent = (event) => {

	if (event.startDate.getDate() == event.endDate.getDate())
		return event

	const firstEventEnd = new Date(event.startDate)
	firstEventEnd.setHours(23)
	firstEventEnd.setMinutes(59)
	//console.log(event.startDate)
	const events = [new Event(event.startDate, firstEventEnd, event.description)]

	const tmpDate = new Date(event.startDate)
	tmpDate.setDate(tmpDate.getDate() + 1)
	for (let i = 0; i < differenceInDays(event.startDate, event.endDate) - 1; i++) {
		tmpDate.setHours(0)
		tmpDate.setMinutes(0)
		const startDate = new Date(tmpDate)

		tmpDate.setHours(23)
		tmpDate.setMinutes(59)
		const endDate = new Date(tmpDate)
		console.log(tmpDate)
		events.push(new Event (startDate, endDate, event.description))
		tmpDate.setDate(tmpDate.getDate() + 1)
	}

	const lastEventStart = new Date(event.endDate)
	lastEventStart.setHours(0)
	lastEventStart.setMinutes(0)
	events.push(new Event(lastEventStart, event.endDate, event.description))

	//console.log(events)
	return events
}

export default Event;
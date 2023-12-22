class Event {

	constructor(year, month, day, startH, startM, endH, endM, description = "Unknown") {
		this.startDate = new Date(year, month, day, startH, startM, 0, 0)
		this.endDate = new Date(year, month, day, endH, endM, 0, 0)
		this.description = description
	}

}

export default Event;
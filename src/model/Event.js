class Event {

	constructor(year, month, day, startH, startM, endH, endM, description = "Unknown") {
		if (arguments.length >= 7) {
			this.startDate = new Date(year, month, day, startH, startM, 0, 0)
			this.endDate = new Date(year, month, day, endH, endM, 0, 0)
			this.description = description
		}
		else { 
			this.startDate = year
			this.endDate = month
			this.description = day
		}
	}
/*
	constructor(startDate, endDate, description = "Unknown") {
		this.startDate = startDate
		this.endDate = endDate
		this.description = description
	}
	*/

}

export default Event;
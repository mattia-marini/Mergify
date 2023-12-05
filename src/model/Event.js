class Event {

	constructor(day, startH, endH, description = "Unknown") {
		this.day = day;
		this.startH = startH;
		this.endH = endH;
		this.description = description;
	}
}

export default Event;
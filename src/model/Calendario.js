import Event from "./Event"

class Calendario {
	events = [
		new Event(1, 2, 3, "Evento 1"),
		new Event(1, 4, 7, "Evento 1"),
		new Event(1, 9, 10, "Riunione"),
		new Event(2, 4, 5, "Compleanno"),
		new Event(5, 8, 10, "Boh"),
		new Event(6, 5, 10),
		new Event(7, 2, 8),
	];
	printInCanvas(context) {
		const width = window.innerWidth;
		const height = window.innerHeight;
		this.events.forEach(event => {
			context.roundRect(width / 7 * (event.day - 1) + 10, height / 10 * event.startH, width / 7 - 20, (event.endH - event.startH) / 10 * height, 10)
			context.font = "12pt Helvetica Neue"
			context.fillText(event.description, width / 7 * (event.day - 1) + 20, height / 10 * event.startH + 20);
		});
	}

	addEvent(event) {
		this.events.push(event)
	}
}

export default Calendario;
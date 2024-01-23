import Event from "./Event"
import { dpr } from "../utils/Misc.js"

class Calendario {
	events = {
		addedManually: [
			new Event(2023, 11, 1, 0, 0, 1, 0, "Evento 1"),
			new Event(2023, 11, 1, 2, 0, 3, 0, "Evento 1"),
			new Event(2023, 11, 1, 4, 0, 7, 0, "Evento 1"),
			new Event(2023, 11, 1, 9, 0, 10, 0, "Riunione"),
			new Event(2023, 11, 2, 4, 0, 5, 0, "Compleanno"),
			new Event(2023, 11, 5, 8, 0, 10, 0, "Boh"),
			new Event(2023, 11, 6, 5, 0, 10, 0, "2"),
			new Event(2023, 11, 7, 2, 30, 8, 30, "desc"),
		],
		prova1: [],
		prova2: [],
		prova3: [],
		prova4: [],
		prova5: [],
		prova6: [],
		prova7: []
	};

	// printInCanvas(canvas) {

	// 	const context = canvas.getContext("2d");
	// 	const width = canvas.width / dpr;
	// 	const height = canvas.height / dpr;
	// 	this.events.forEach(event => {
	// 		context.roundRect(width / 7 * (event.day - 1) + 10, height / 10 * event.startH, width / 7 - 20, (event.endH - event.startH) / 10 * height, 10)
	// 		context.font = "12pt Helvetica Neue"
	// 		context.fillText(event.description, width / 7 * (event.day - 1) + 20, height / 10 * event.startH + 20);
	// 	});
	// }


	addEvent(event, calendar) {
		if (arguments.length == 1) {
			if (!this.events.addedManually)
				this.events.addedManually = []
			this.events.addedManually.push(event)
		}
		else
			this.events[calendar].push(event)

	}

	addCalendar(calendar, events) {

		if (events[calendar] != null) {
			const d = {}
			events.forEach(e => {
				d[e] = true
			})
			events[calendar].forEach(e => {
				if (!d[e])
					d[e] = true
			})

			const v = []
			Object.entries(d).forEach(([key, value]) => { v.push(key) })
			events[calendar] = v
		}

		this.events[calendar] = events
	}

	removeCalendar(name) {
		if (this.events[name]) {
			delete this.events[name]
		}
	}

}

export default Calendario;
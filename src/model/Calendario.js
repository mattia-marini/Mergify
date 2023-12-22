import Event from "./Event"
import { dpr } from "../utils/Misc.js"

class Calendario {
	events = [
		new Event(2023, 11, 1, 0, 0, 1, 0, "Evento 1"),
		new Event(2023, 11, 1, 2, 0, 3, 0, "Evento 1"),
		new Event(2023, 11, 1, 4, 0, 7, 0, "Evento 1"),
		new Event(2023, 11, 1, 9, 0, 10, 0, "Riunione"),
		new Event(2023, 11, 2, 4, 0, 5, 0, "Compleanno"),
		new Event(2023, 11, 5, 8, 0, 10, 0, "Boh"),
		new Event(2023, 11, 6, 5, 0, 10, 0, "2"),
		new Event(2023, 11, 7, 2, 0, 8, 0, "desc"),
	];

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


	addEvent(event) {
		this.events.push(event)
	}
}

export default Calendario;
import Event from "../../model/Event.js";

let prevClickX = 0;
let prevClickY = 0;

export const mouseDown = () => {
	return (e) => {
		prevClickX = e.clientX;
		prevClickY = e.clientY;
	}
}

export const mouseMove = (component) => {
	return (e) => {
		if (e.buttons == 1) {
			const canvas = component.topLayerRef.current;
			const context = canvas.getContext("2d");
			context.setLineDash([10, 10]);
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.strokeRect(prevClickX, prevClickY, e.clientX - prevClickX, e.clientY - prevClickY);
		}
	}
}

export const mouseUp = (component) => {
	return (e) => {
		const canvas2 = component.topLayerRef.current;
		const context2 = canvas2.getContext("2d");
		context2.clearRect(0, 0, canvas2.width, canvas2.height)
		console.log("prova");
		const width = window.innerWidth;
		const height = window.innerHeight;
		const colWidth = width / 7;
		if (Math.floor(e.clientX / colWidth) === Math.floor(prevClickX / colWidth)) {
			component.cal.addEvent(new Event(Math.floor(e.clientX / colWidth) + 1, prevClickY / height * 10, e.clientY / height * 10));
			component.drawCal();

		}
	}
}
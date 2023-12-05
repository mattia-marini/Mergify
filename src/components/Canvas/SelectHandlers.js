import Event from "../../model/Event.js";
import * as Utils from "../../utils/Misc.js"

let prevClickX = -1;
let prevClickY = -1;

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
		if (prevClickX == -1 || prevClickY == -1)
			return;
		const canvas2 = component.topLayerRef.current;
		const context2 = canvas2.getContext("2d");
		context2.clearRect(0, 0, canvas2.width, canvas2.height)
		console.log("prova");
		const width = canvas2.width / Utils.dpr;
		const height = canvas2.height / Utils.dpr;
		const colWidth = width / 7;
		if (Math.floor(e.clientX / colWidth) === Math.floor(prevClickX / colWidth)) {

			const [minX, minY, , maxY] = Utils.normalizeRect(prevClickX, e.clientX, prevClickY, e.clientY);
			component.cal.addEvent(new Event(Math.floor(minX / colWidth) + 1, Math.max(minY / height * 10, 0), Math.min(maxY / height * 10, 10)));
			component.drawCal();

		}

		console.log(e.clientX);

		prevClickY = -1;
		prevClickX = -1;
	}
}



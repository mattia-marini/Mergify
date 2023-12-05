import { useEffect, useRef } from "react";

export const Canvas = () => {

	const bottomLayerRef = useRef();
	const topLayerRef = useRef();

	let prevClickX = 0;
	let prevClickY = 0;
	class Event {

		constructor(day, startH, endH, description = "Unknown") {
			this.day = day;
			this.startH = startH;
			this.endH = endH;
			this.description = description;
		}
	}

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
				context.stroke();
			});
		}

		addEvent(event) {
			this.events.push(event)
		}
	}

	const cal = new Calendario();

	function drawCal() {
		const context = bottomLayerRef.current.getContext("2d");
		const width = window.innerWidth;
		const height = window.innerHeight;
		for (let i = 1; i <= 6; i++) {
			context.beginPath();
			context.moveTo(width / 7 * i, 0);
			context.lineTo(width / 7 * i, height);
			context.stroke();
		}
		cal.printInCanvas(context);
	}

	const mouseDown = (e) => {
		prevClickX = e.clientX;
		prevClickY = e.clientY;
	}

	const mouseMove = (e) => {
		if (e.buttons == 1) {
			const canvas = topLayerRef.current;
			const context = canvas.getContext("2d");
			context.setLineDash([10, 10]);
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.strokeRect(prevClickX, prevClickY, e.clientX - prevClickX, e.clientY - prevClickY);
		}
	}

	const mouseUp = (e) => {
		const canvas2 = topLayerRef.current;
		const context2 = canvas2.getContext("2d");
		context2.clearRect(0, 0, canvas2.width, canvas2.height)
		const width = window.innerWidth;
		const height = window.innerHeight;
		const colWidth = width / 7;
		if (Math.floor(e.clientX / colWidth) === Math.floor(prevClickX / colWidth)) {
			const context = bottomLayerRef.current.getContext("2d");
			cal.addEvent(new Event(Math.floor(e.clientX / colWidth) + 1, prevClickY / height * 10, e.clientY / height * 10));
			//context.roundRect(colWidth * Math.floor(e.clientX / colWidth) + 10, prevClickY, colWidth - 20, (e.clientY - prevClickY), 10);
			cal.printInCanvas(context);

			context.stroke();
		}
	}


	useEffect(() => {
		const dpr = window.devicePixelRatio || 1;

		const canvas1 = bottomLayerRef.current;
		const canvas2 = topLayerRef.current;

		const context1 = canvas1.getContext("2d");
		const context2 = canvas2.getContext("2d");

		canvas1.width = window.innerWidth * dpr;
		canvas1.height = window.innerHeight * dpr;

		canvas2.width = window.innerWidth * dpr;
		canvas2.height = window.innerHeight * dpr;

		context1.scale(dpr, dpr);
		context2.scale(dpr, dpr);
		drawCal();
		window.addEventListener("resize", function () {
			canvas1.width = window.innerWidth * dpr;
			canvas1.height = window.innerHeight * dpr;

			canvas2.width = window.innerWidth * dpr;
			canvas2.height = window.innerHeight * dpr;

			context1.scale(dpr, dpr);
			context2.scale(dpr, dpr);
			drawCal();
		})
	})
	return (
		<div style={{ position: "relative" }}>
			<canvas ref={bottomLayerRef}
				style={{
					position: "absolute",
					height: "100vh",
					width: "100vw",
					boxSizing: "border-box",
					display: "block",
					background: "light-gray",
					margin: "none",
					padding: "none",
				}} >
			</canvas>
			<canvas ref={topLayerRef}
				onMouseDown={mouseDown}
				onMouseUp={mouseUp}
				onMouseMove={mouseMove}
				style={{
					position: "absolute",
					height: "100vh",
					width: "100vw",
					boxSizing: "border-box",
					display: "block",
					margin: "none",
					padding: "none",
				}}
			>
			</canvas>
		</div >);
}
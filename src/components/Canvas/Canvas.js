import React from "react";
import "./canvas.css";
import { mouseUp, mouseDown, mouseMove } from "./SelectHandlers";
import Calendario from "../../model/Calendario.js"

const Tools = {
	Select: 0,
	DrawEvent: 1
}


class Canvas extends React.Component {

	bottomLayerRef;
	topLayerRef;

	cal = new Calendario();

	constructor() {
		super();
		this.bottomLayerRef = React.createRef();
		this.topLayerRef = React.createRef();
	}
	render() {
		return (
			<div style={{ position: "relative" }}>
				<canvas ref={this.bottomLayerRef}
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
				<canvas ref={this.topLayerRef}
						onMouseDown={mouseDown()}
						onMouseUp={mouseUp( this )}
						onMouseMove={mouseMove( this )}
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

	drawCal =  () => {
		const canvas = this.bottomLayerRef.current;
		const context = canvas.getContext("2d");
		const width = canvas.width;
		const height = canvas.height;
		context.clearRect(0, 0, width, height);

		context.lineWidth = 2;
		context.beginPath();
		for (let i = 1; i <= 6; i++) {
			context.moveTo(width / 7 * i, 0);
			context.lineTo(width / 7 * i, height);
		}
		this.cal.printInCanvas(context);
		context.stroke();
	}

	componentDidMount() {
		const dpr = window.devicePixelRatio || 1;

		const canvas1 = this.bottomLayerRef.current;
		const canvas2 = this.topLayerRef.current;

		const context1 = canvas1.getContext("2d");
		const context2 = canvas2.getContext("2d");

		canvas1.width = window.innerWidth * dpr;
		canvas1.height = window.innerHeight * dpr;

		canvas2.width = window.innerWidth * dpr;
		canvas2.height = window.innerHeight * dpr;

		context1.scale(dpr, dpr);
		context2.scale(dpr, dpr);

		this.drawCal();

		const onResize = () => {
			canvas1.width = window.innerWidth * dpr;
			canvas1.height = window.innerHeight * dpr;

			canvas2.width = window.innerWidth * dpr;
			canvas2.height = window.innerHeight * dpr;

			context1.scale(dpr, dpr);
			context2.scale(dpr, dpr);
			this.drawCal();
		}

		window.addEventListener("resize", onResize);
	}

}

export default Canvas;
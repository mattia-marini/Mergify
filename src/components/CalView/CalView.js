import React from 'react';
import "./CalView.css"
import { mouseUp, mouseDown, mouseMove } from "../CalView/SelectHandlers.js";
import Calendario from "../../model/Calendario.js";
import { dpr } from "../../utils/Misc.js";

const Tools = {
	Select: 0,
	DrawEvent: 1
}



class CalView extends React.Component {

	bottomLayerRef;
	topLayerRef;
	containerRef;
	tool = Tools.Select;
	cal = new Calendario()


	continents = ["sesso", "ops", "ops", "ops"]

	constructor() {
		super();
		this.bottomLayerRef = React.createRef();
		this.topLayerRef = React.createRef();
		this.divRef = React.createRef();
		this.containerRef = React.createRef();
		this.state = {
			forceRender: false
		}
		const root = document.documentElement;
		this.eventXPadding = parseFloat(getComputedStyle(root).getPropertyValue('--event-x-padding'));
		this.eventYPadding = parseFloat(getComputedStyle(root).getPropertyValue('--event-y-padding'));
	}

	render() {
		return (
			<div ref={this.containerRef} className="container" style={{}}>
				<canvas ref={this.bottomLayerRef}
					className='bottomLayer'
				/>
				<canvas ref={this.topLayerRef}
					onMouseDown={mouseDown(this)}
					className='topLayer'
				/>
				<div className='events'>
					{this.renderEvents()}
				</div>
			</div >);
	}

	// render() {
	// 	return (
	// 		<div style={{ position: "relative" }}>
	// 			<canvas ref={this.bottomLayerRef}
	// 				style={{
	// 					position: "absolute",
	// 					height: "100vh",
	// 					width: "100vw",
	// 					boxSizing: "border-box",
	// 					display: "block",
	// 					background: "light-gray",
	// 					margin: "none",
	// 					padding: "none",
	// 				}} >
	// 			</canvas>

	// 			<canvas ref={this.topLayerRef}
	// 				onMouseDown={mouseDown()}
	// 				style={{
	// 					position: "absolute",
	// 					height: "100vh",
	// 					width: "100vw",
	// 					boxSizing: "border-box",
	// 					display: "block",
	// 					margin: "none",
	// 					padding: "none",
	// 				}}
	// 			>
	// 			</canvas>
	// 			{this.renderEvents()}
	// 		</div >);
	// }

	renderEvents() {
		return (

			this.cal.events.map((event, index) => {
				return (
					<div className="event" key={index}
						onClick={() => console.log(event.description)}
						style={{
							top: `calc(${event.startH} / 10 * 100%)`,
							left: `calc((${event.day} - 1) / 7 * 100%)`,
							height: `calc(${event.endH} / 10 * 100% - ${event.startH} / 10 * 100%)`
						}}>
						{event.description}
					</div>
				);
			})
		)

	}

	drawCal = () => {
		const canvas = this.bottomLayerRef.current;
		const context = canvas.getContext("2d");
		const width = canvas.width / dpr - 2 * this.eventXPadding;
		const height = canvas.height / dpr - 2 * this.eventYPadding;
		context.clearRect(0, 0, width, height);
		context.beginPath();
		for (let i = 1; i <= 6; i++) {
			context.moveTo(width / 7 * i + this.eventXPadding, 0);
			context.lineTo(width / 7 * i + this.eventXPadding, height + 2 * this.eventYPadding);
		}
		//this.cal.printInCanvas(canvas);
		context.stroke();
	}

	componentDidMount() {

		const canvas1 = this.bottomLayerRef.current;
		const canvas2 = this.topLayerRef.current;

		const context1 = canvas1.getContext("2d");
		const context2 = canvas2.getContext("2d");

		const bounds = this.containerRef.current.getBoundingClientRect()

		canvas1.width = bounds.width * dpr;
		canvas1.height = bounds.height * dpr;

		canvas2.width = bounds.width * dpr;
		canvas2.height = bounds.height * dpr;

		context1.scale(dpr, dpr);
		context2.scale(dpr, dpr);


		this.drawCal();

		const onResize = () => {

			const bounds = this.containerRef.current.getBoundingClientRect()
			canvas1.width = bounds.width * dpr;
			canvas1.height = bounds.height * dpr;

			canvas2.width = bounds.width * dpr;
			canvas2.height = bounds.height * dpr;

			context1.scale(dpr, dpr);
			context2.scale(dpr, dpr);
			this.drawCal();
		}

		window.addEventListener("resize", onResize);
		window.addEventListener("mousemove", mouseMove(this));
		window.addEventListener("mouseup", mouseUp(this));
	}

}

export default CalView;
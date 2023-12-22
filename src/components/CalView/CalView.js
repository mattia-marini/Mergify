import React from 'react';
import "./CalView.css"
import { mouseUp, mouseDown, mouseMove, dragHandler, handleBorders, handleMouseLeave} from "../CalView/SelectHandlers.js";
import Calendario from "../../model/Calendario.js";
import { dpr } from "../../utils/Misc.js";

// const myFont = new FontFace('Georgia', 'url(public/fonts/Georgia.ttf) format("ttf")');

// myFont.load().then((font) => {
// 	document.fonts.add(font);

// 	console.log('Font loaded');
// });

const Tools = {
	Select: 0,
	DrawEvent: 1
}


const calLabelsYSpacing = 30 //distanza fra etichette giorni dal calendario stesso
const calLabelsXSpacing = 30 //distanza fra etichette ore dal calendario stesso

class CalView extends React.Component {

	bottomLayerRef;
	topLayerRef;
	containerRef;
	tool = Tools.Select;
	cal = new Calendario()



	constructor({currWeek, changeWeek}) {
		super();
		this.bottomLayerRef = React.createRef();
		this.topLayerRef = React.createRef();
		this.divRef = React.createRef();
		this.containerRef = React.createRef();
		this.state = {
			forceRender: false
		}
		const root = document.documentElement;

		this.eventLPadding = parseFloat(getComputedStyle(root).getPropertyValue('--event-l-padding'));
		this.eventRPadding = parseFloat(getComputedStyle(root).getPropertyValue('--event-r-padding'));
		this.eventTPadding = parseFloat(getComputedStyle(root).getPropertyValue('--event-t-padding'));
		this.eventBPadding = parseFloat(getComputedStyle(root).getPropertyValue('--event-b-padding'));

		this.currWeek = currWeek
		this.changeWeek = changeWeek
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
				if (event.startDate.getFullYear() == this.currWeek.getFullYear()
					&& event.startDate.getMonth() == this.currWeek.getMonth()
					&& (event.startDate.getDate() < this.currWeek.getDate() + 7 && event.startDate.getDate() >= this.currWeek.getDate())) {
					return (
						<div className="outerEvent" key={index}
							onClick={() => console.log(event.description)}
							onMouseMove={handleBorders()}
							onMouseLeave={handleMouseLeave()}
							onDragEnd={dragHandler(this)}
							style={{
								top: `calc(${event.startDate.getHours()} / 24 * 100% - 3px)`,
								left: `calc((${event.startDate.getDay()} - 1) / 7 * 100%)`,
								height: `calc(${event.endDate.getHours()} / 24 * 100% - ${event.startDate.getHours()} / 24 * 100% + 6px)`
							}}>
							<div className='innerEvent'>
								{event.description}
							</div>
						</div>
					)
				}
			})
		)

	}

	getCanvasActualSize = (canvas) => {
		return [canvas.width / dpr - this.eventLPadding - this.eventRPadding, canvas.height / dpr - this.eventTPadding - this.eventBPadding]
	}

	drawCal = () => {
		const canvas = this.bottomLayerRef.current;
		const context = canvas.getContext("2d");
		const [width, height] = this.getCanvasActualSize(canvas)

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.beginPath();
		context.textAlign = "right";
		context.font = "12px ShoikaLight";
		context.textBaseline = "middle";
		context.lineWidth = 0.5;

		for (let i = 0; i <= 7; i++) {
			context.moveTo(width / 7 * i + this.eventLPadding, this.eventTPadding);
			context.lineTo(width / 7 * i + this.eventLPadding, height + this.eventTPadding);
		}

		for (let i = 0; i <= 24; i++) {
			context.moveTo(this.eventLPadding, height / 24 * i + this.eventTPadding);
			context.lineTo(width + this.eventLPadding, height / 24 * i + this.eventTPadding)
			context.fillText((i > 9 ? i.toString() : "0".concat(i)).concat(":00")
				, this.eventLPadding - calLabelsXSpacing, height / 24 * i + this.eventTPadding)
		}

		context.stroke();

		const days = ["M", "T", "W", "T", "F", "S", "S"]

		days.forEach((day, i) => {
			context.fillText(day, width / 7 * i + this.eventLPadding + width / 14, this.eventTPadding - calLabelsYSpacing)
		});

		//this.cal.printInCanvas(canvas);
	}

	componentDidMount() {



		const canvas1 = this.bottomLayerRef.current;
		const canvas2 = this.topLayerRef.current;

		const context1 = canvas1.getContext("2d");
		const context2 = canvas2.getContext("2d");

		const bounds = this.containerRef.current.getBoundingClientRect()

		canvas1.width = bounds.width * dpr;
		canvas1.height = 2 * bounds.height * dpr;

		canvas2.width = bounds.width * dpr;
		canvas2.height = 2 * bounds.height * dpr;

		context1.scale(dpr, dpr);
		context2.scale(dpr, dpr);

		document.fonts.ready.then(() => {
			this.drawCal();
		});

		this.drawCal();
		const onResize = () => {

			const bounds = this.containerRef.current.getBoundingClientRect()
			canvas1.width = bounds.width * dpr;
			canvas1.height = 2 * bounds.height * dpr;

			canvas2.width = bounds.width * dpr;
			canvas2.height = 2 * bounds.height * dpr;

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
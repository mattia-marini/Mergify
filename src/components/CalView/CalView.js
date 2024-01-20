import React from 'react';
import "./CalView.css"
import { mouseUp, mouseDown, mouseMove, dragHandler, handleBorders, handleMouseLeave, handleDoubleClick} from "../CalView/SelectHandlers.js";
import Calendario from "../../model/Calendario.js";
import { dpr } from "../../utils/Misc.js";
import {isSameWeek, getNormalizedDay} from '../../utils/Date.js'

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



	constructor(props) {
		super(props);
		this.bottomLayerRef = React.createRef();
		this.topLayerRef = React.createRef();
		this.divRef = React.createRef();
		this.containerRef = React.createRef();
		this.state = {
			forceRender: false, 
		}
		const root = document.documentElement;

		this.eventLPadding = parseFloat(getComputedStyle(root).getPropertyValue('--event-l-padding'));
		this.eventRPadding = parseFloat(getComputedStyle(root).getPropertyValue('--event-r-padding'));
		this.eventTPadding = parseFloat(getComputedStyle(root).getPropertyValue('--event-t-padding'));
		this.eventBPadding = parseFloat(getComputedStyle(root).getPropertyValue('--event-b-padding'));

		this.currWeek = this.props.currWeek
		this.changeWeek = this.props.changeWeek
	}

	render() {
		//console.log(this.props.currWeek);
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


	renderEvents() {
		return (
			this.cal.events.map((event, index) => {
				if (isSameWeek(event.startDate, this.props.currWeek)) {
					return (
						<div className="outerEvent" key={index} id={index}
							onDoubleClick={handleDoubleClick(this)}
							onMouseMove={handleBorders()}
							onMouseLeave={handleMouseLeave()}

							// onMouseDown={dragDown()}
							// onMouseUp={dragUp(this)}
							style={{
								top: `calc(${event.startDate.getHours()} / 24 * 100% + ${event.startDate.getMinutes()} / 1440 * 100% - 3px)`,
								left: `calc((${getNormalizedDay(event.startDate)} - 1) / 7 * 100%)`,
								height: `calc(${event.endDate.getHours() - event.startDate.getHours()} / 24 * 100% 
								+ ${event.endDate.getMinutes() - event.startDate.getMinutes()} / 1440 * 100% + 6px)`
							}}>
							<div className='innerEvent'>
								<input className='eventName' defaultValue={event.description} id={index} autoComplete='off'
									onKeyDown={
										(e) => {
											if (e.code == "Enter") {
												//console.log(e.currentTarget.value)
												e.currentTarget.blur()
												this.cal.events[e.currentTarget.id].description = e.currentTarget.value
											}
											else if (e.code == "Escape") {
												e.currentTarget.value = this.cal.events[e.currentTarget.id].description
												e.currentTarget.blur()
											}
										}
									}
									onBlur={(e) => this.cal.events[e.currentTarget.id].description = e.currentTarget.value }
									  />
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
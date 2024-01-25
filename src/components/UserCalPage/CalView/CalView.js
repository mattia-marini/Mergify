import React from 'react';
import Styles from "./CalView.module.css"
import { mouseUp, mouseDown, mouseMove, dragHandler, handleBorders, handleMouseLeave, handleDoubleClick, handleBorderDrag } from "./SelectHandlers.js";
import Calendario from "../../../model/Calendario.js";
import { dpr } from "../../../utils/Misc.js";
import { isSameWeek, getNormalizedDay } from '../../../utils/Date.js'

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
		this.cal = this.props.cal


	}

	render() {
		//console.log(this.props.currWeek);
		return (
			<div ref={this.containerRef} className={Styles.container} style={{}}>
				<canvas ref={this.bottomLayerRef}
					className={Styles.bottomLayer}
				/>
				<canvas ref={this.topLayerRef}
					onMouseDown={mouseDown(this)}
					className={Styles.topLayer}
				/>
				<div className={Styles.events}>
					{this.renderEvents()}
				</div>
			</div >);
	}


	renderEvents() {

		const v = []
		Object.entries(this.cal.events).forEach(([calendar, events]) => {
			events.forEach((event, index) => {

				if (isSameWeek(event.startDate, this.props.currWeek)) {

					v.push(
						<div className={Styles.outerEvent} key={index} id={index} data-calendar={calendar}
							onDoubleClick={handleDoubleClick(this)}
							onMouseMove={handleBorders()}
							onMouseLeave={handleMouseLeave()}

							onMouseDown={handleBorderDrag(this)}
							style={{
								top: `calc(${event.startDate.getHours()} / 24 * 100% + ${event.startDate.getMinutes()} / 1440 * 100% - 3px)`,
								left: `calc((${getNormalizedDay(event.startDate)} - 1) / 7 * 100%)`,
								height: `calc(${event.endDate.getHours() - event.startDate.getHours()} / 24 * 100% 
								+ ${event.endDate.getMinutes() - event.startDate.getMinutes()} / 1440 * 100% + 6px)`
							}}>
							<div className={Styles.innerEvent}>
								<input className={Styles.eventName} defaultValue={event.description} id={index} autoComplete='off'
									onKeyDown={
										(e) => {
											if (e.code == "Enter") {
												//console.log(e.currentTarget.value)
												e.currentTarget.blur()
												this.cal.events[calendar][e.currentTarget.id].description = e.currentTarget.value
											}
											else if (e.code == "Escape") {
												e.currentTarget.value = this.cal.events[calendar][e.currentTarget.id].description
												e.currentTarget.blur()
											}
										}
									}
									onBlur={(e) => this.cal.events[calendar][e.currentTarget.id].description = e.currentTarget.value}
								/>
							</div>
						</div>
					)

				}
			})

		})

		//console.log(v)

		return v

	}

	getCanvasActualSize = (canvas) => {
		return [canvas.width / dpr - this.eventLPadding - this.eventRPadding, canvas.height / dpr - this.eventTPadding - this.eventBPadding]
	}

	drawCal = () => {
		const canvas = this.bottomLayerRef.current;
		if (!canvas) return
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
		if (!(canvas1 && canvas2)) return

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
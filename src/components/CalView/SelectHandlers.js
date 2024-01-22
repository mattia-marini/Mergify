import Event from "../../model/Event.js";
import * as Utils from "../../utils/Misc.js"

let prevClickX = -1;
let prevClickY = -1;

let draggedEvent = null;
let draggedBorder = -1; // 1 top, 0 bottom


const getTimeFromCoordinate = (component, coordinate) => {
	const [, height] = component.getCanvasActualSize(component.topLayerRef.current)
	const hour = Math.min(Math.max(Math.floor((coordinate - component.eventTPadding) / height * 24), 0), 23)

	//console.log(hour)

	let minute = -1

	if (hour == 23)
		minute = Math.min((coordinate - (component.eventTPadding + height / 24 * 23)) / (height / 24) * 60, 59)
	else
		minute = Math.min(Math.max((coordinate - component.eventTPadding), 0) % (height / 24) / (height / 24) * 60, 59)

	return [hour, minute]
}

const cordinatesToTimeInterval = (component, minY, maxY) => {

	// const [width, height] = component.getCanvasActualSize(component.topLayerRef.current)

	// const startH = Math.max(Math.floor((minY - component.eventTPadding) / height * 24), 0)

	// const startM = startH == 24 ? 0 : Math.min((minY - component.eventTPadding) % (height / 24) / (height / 24) * 60, 59)

	// const endH = Math.min((maxY - component.eventTPadding) / height * 24, 23)

	// const endM = endH == 24 ? 0 : Math.min((maxY - component.eventTPadding) % (height / 24) / (height / 24) * 60, 59)
	const [startH, startM] = getTimeFromCoordinate(component, minY)
	const [endH, endM] = getTimeFromCoordinate(component, maxY)

	return [startH, startM, endH, endM]

}


function getComponentCoordinates(e, component) {
	const bounds = component.getBoundingClientRect()
	return [
		e.clientX - bounds.left,
		e.clientY - bounds.top,
	]
}

export const mouseDown = (component) => {
	return (e) => {

		[prevClickX, prevClickY] = getComponentCoordinates(e, component.topLayerRef.current)
	}
}

export const mouseMove = (component) => {
	return (e) => {
		const canvas = component.topLayerRef.current;
		const context = canvas.getContext("2d");
		const [currX, currY] = getComponentCoordinates(e, canvas)
		if (prevClickX != -1 && prevClickY != -1 && e.buttons == 1) {
			context.setLineDash([10, 10]);
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.strokeRect(prevClickX, prevClickY, currX - prevClickX, currY - prevClickY);
		}
		else if (draggedEvent != null) {
			//component.cal.events[draggedEvent.id] = 
			//console.log("muovo")
			const calEvent = component.cal.events[draggedEvent.dataset.calendar][draggedEvent.id]
			const [hour, minute] = getTimeFromCoordinate(component, currY)
			if (draggedBorder == 1) {
				calEvent.startDate.setHours(hour)
				calEvent.startDate.setMinutes(minute)
			}
			else {
				calEvent.endDate.setHours(hour)
				calEvent.endDate.setMinutes(minute)
			}

			component.setState({ forceRender: true })
			//component.cal.events[]
		}
	}
}

export const mouseUp = (component) => {
	return (e) => {
		if (prevClickX != -1 && prevClickY != -1) {
			const canvas2 = component.topLayerRef.current;
			const context2 = canvas2.getContext("2d");
			context2.clearRect(0, 0, canvas2.width, canvas2.height)

			const [width, height] = component.getCanvasActualSize(component.topLayerRef.current)

			const colWidth = width / 7;

			const [currX, currY] = getComponentCoordinates(e, component.topLayerRef.current)

			if (currX > component.eventLPadding && (currX < width + component.eventLPadding) &&
				(Math.floor((currX - component.eventLPadding) / colWidth) === Math.floor((prevClickX - component.eventLPadding) / colWidth)) &&
				Math.abs(prevClickY - currY) > height / 70
			) {

				const [minX, minY, , maxY] = Utils.normalizeRect(prevClickX, currX, prevClickY, currY);

				const [startH, startM, endH, endM] = cordinatesToTimeInterval(component, minY, maxY)

				component.cal.addEvent(new Event(
					component.props.currWeek.getFullYear(),
					component.props.currWeek.getMonth(),
					component.props.currWeek.getDate() + Math.floor((minX - component.eventLPadding) / colWidth),
					startH,
					startM,
					endH,
					endM
				));
				component.drawCal();
				component.setState({ forceRender: true })

			}
		}

		//console.log(e.clientX);

		prevClickY = -1;
		prevClickX = -1;

		if (draggedEvent != null) {
			document.body.style.cursor = 'default'
			draggedEvent.children[0].style.border = "5px solid transparent"
			draggedEvent.children[0].style.borderRadius = "10px"
			draggedEvent.children[0].style.backgroundColor = "var(--mfdarkgray)"
			console.log(draggedEvent.children[0])
			console.log(draggedEvent.children[0].border, draggedEvent.children[0].borderRadius, draggedEvent.children[0].backgroundColor)
			//component.setState({forceRender : true})
		}
		draggedEvent = null;
		draggedBorder = -1
	}
}


export const handleDoubleClick = (component) => {
	return (event) => {
		event.currentTarget.children[0].children[0].focus()
	}
}


export const handleBorderDrag = (component) => {
	return (event) => {
		const borderThickness = 6;

		const eventBox = event.currentTarget.getBoundingClientRect()

		const innerDiv = event.currentTarget.children[0].style
		if (event.clientY <= eventBox.y + borderThickness) {
			draggedEvent = event.currentTarget
			console.log("lightGray")
			draggedEvent.children[0].style.backgroundColor = "var(--mflightgray)"
			draggedBorder = 1
		}
		else if (event.clientY >= eventBox.y + eventBox.height - borderThickness) {
			draggedEvent = event.currentTarget
			console.log("lightGray")
			draggedEvent.children[0].style.backgroundColor = "var(--mflightgray)"
			draggedBorder = 0
		}
	}
}


export const handleBorders = () => {
	return (event) => {

		const borderThickness = 6;

		const eventBox = event.currentTarget.getBoundingClientRect()

		const innerDiv = event.currentTarget.children[0].style
		if (draggedEvent != event.currentTarget) {

			if (event.clientY <= eventBox.y + borderThickness) {
				innerDiv.borderTop = "5px solid black"
				innerDiv.borderRadius = "0 0 10px 10px"
				innerDiv.backgroundColor = "var(--mfdarkgray)"
				document.body.style.cursor = 'row-resize';
			}
			else if (event.clientY >= eventBox.y + eventBox.height - borderThickness) {
				innerDiv.borderBottom = "5px solid black"
				innerDiv.borderRadius = "10px 10px 0 0"
				innerDiv.backgroundColor = "var(--mfdarkgray)"
				document.body.style.cursor = 'row-resize';
			}
			else {
				event.currentTarget.children[0].style.backgroundColor = "black"
				document.body.style.cursor = 'default';
				innerDiv.border = "5px solid transparent"
				innerDiv.borderRadius = "10px"
			}
		}
	}
}
export const handleMouseLeave = () => {
	return (event) => {
		const innerDiv = event.currentTarget.children[0].style
		//console.log("mouse left")
		if (draggedEvent != event.currentTarget) {
			document.body.style.cursor = 'default'
			innerDiv.backgroundColor = "var(--mfdarkgray)"
			innerDiv.border = "5px solid transparent"
			innerDiv.borderRadius = "10px"
		}
	}
}
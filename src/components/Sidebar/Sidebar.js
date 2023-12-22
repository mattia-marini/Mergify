import React from 'react'
import { useState, useEffect, useRef } from 'react'
import "./Sidebar.css"
import { getMonth } from 'date-fns'

const months = {
	ita: {
		0: "Gennaio",
		1: "Febbraio",
		2: "Marzo",
		3: "Aprile",
		4: "Maggio",
		5: "Giugno",
		6: "Luglio",
		7: "Agosto",
		8: "Settembre",
		9: "Ottobre",
		10: "Novembre",
		11: "Dicembre",
	}
}
export default function Sidebar({ currWeek }) {

	const [month, setMonth] = useState(new Date(currWeek))

	const gridRef = useRef()
	const gridHover = useRef()
	const weekOverlay = useRef()

	const getMonthDays = (date, offset) => {
		return (new Date(date.getFullYear(), date.getMonth() + 1 + offset, 0)).getDate()
	}
	const nextMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0, 0, 0)
	}
	const prevMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(), 0, 0, 0, 0)
	}
	const computeDays = () => {
		const tmpDate = new Date(month)
		tmpDate.setDate(1);
		//console.log(getMonthDays(date, 0))
		const today = new Date()

		const rv = []
		let key = 0
		//console.log(`DATE ${date.getDay()}`)
		let dayOfTheWeek = tmpDate.getDay()
		dayOfTheWeek = dayOfTheWeek === 0 ? 7 : dayOfTheWeek

		for (let i = dayOfTheWeek - 1; i > 0; i--) {
			rv.push(<h6 className='grayDays' key={key}>{getMonthDays(tmpDate, -1) - i + 1}</h6>)
			key++;
		}

		if (tmpDate.getMonth() == today.getMonth()) {
			for (let i = 1; i < today.getDate(); i++) {
				rv.push(<h6 className='blackDays' key={key}>{i}</h6>)
				key++;
			}
			rv.push(<h6 style={{ color: "var(--mfalmostwhite)", backgroundColor: "var(--mfgray)", padding: "5px", borderRadius: "7px" }}
				className='blackDays' key={key}>{today.getDate()}</h6>)
			key++
			for (let i = today.getDate() + 1; i <= getMonthDays(tmpDate, 0); i++) {
				rv.push(<h6 className='blackDays' key={key}>{i}</h6>)
				key++;
			}
		}
		else {
			for (let i = 1; i <= getMonthDays(tmpDate, 0); i++) {
				rv.push(<h6 className='blackDays' key={key}>{i}</h6>)
				key++;
			}
		}
		let remainingDays = 7 - key % 7
		remainingDays = remainingDays == 7 ? 0 : remainingDays
		for (let i = 1; i <= remainingDays; i++) {
			rv.push(<h6 className='grayDays' key={key}>{i}</h6>)
			key++;
		}


		return rv
	}

	useEffect(() => {
		// console.log(gridRef.current.children.length)
		//console.log(currWeek.getDate())
		weekOverlay.current.style.display = "none"
		const rows = window.getComputedStyle(gridRef.current, null).getPropertyValue("grid-template-rows")
		console.log(rows.substring(0, 4))


		gridHover.current.style.top = rows.substring(0, 4)
		gridHover.current.style.gridTemplateRows = rows.substring(4)

		for (let i = 7; i < gridRef.current.children.length; i += 7) {
			// console.log(gridRef.current.children[i])


			const element = gridRef.current.children[i]
			if (element.textContent == currWeek.getDate()) {
				if ((element.className == "blackDays" && currWeek.getMonth() == month.getMonth())
					|| (element.className == "grayDays" && currWeek.getMonth() == month.getMonth() - 1)) {

					const gridElementBox = element.getBoundingClientRect()

					weekOverlay.current.style.top = `${gridElementBox.y - gridRef.current.getBoundingClientRect().y - 10}px`
					weekOverlay.current.style.height = `${gridElementBox.height + 20}px`

					weekOverlay.current.style.display = "block"
					// console.log(element.getBoundingClientRect())

					// weekOverlay.current.style.top = 
					console.log(element)
				}
			}
		}

		// gridRef.current.children.forEach(element => {
		// 	console.log(element)
		// });
	}, [currWeek, month])

	const computeHighlight = () => {
		// console.log(gridRef.current)
		// gridRef.current.children.forEach(element => {
		// 	console.log(element)
		// });
		return 0;
	}

	return (
		<div className='sidebar' >
			<div id='date'>
				<h1 style={{ margin: "0" }}>{months.ita[month.getMonth()]}</h1>
				<h3 style={{ margin: "0", color: "var(--mflightgray)", padding: "0 0 0 20px" }}>{month.getFullYear()}</h3>
			</div>
			<div style={{ alignSelf: "flex-end", margin: "10px 0 10px 0" }}>
				<button id='prev' onClick={() => { setMonth(prevMonth(month)) }}>&lt;</button>
				<button id='next' onClick={() => { setMonth(nextMonth(month)) }}>&gt;</button>
			</div>
			<div style={{
				width: "100%",
				position: "relative"
			}}>
				<div id='calGrid' ref={gridRef}>
					<h3 className='gridItem'>M</h3>
					<h3 className='gridItem'>T</h3>
					<h3 className='gridItem'>W</h3>
					<h3 className='gridItem'>T</h3>
					<h3 className='gridItem'>F</h3>
					<h3 className='gridItem'>S</h3>
					<h3 className='gridItem'>S</h3>
					{computeDays()}
				</div>
				<div ref={gridHover}
				id="gridHover"
				>
					{
						(() => {
							month.setDate(1)
							const nRows = Math.ceil((getMonthDays(month, 0) + (month.getDay() == 0 ? 7 : month.getDay() - 1)) / 7)
							const rv = []
							for (let i = 0; i < nRows; i++) {
								rv.push(<div className='gridHoverSegment' key={`gridHoverSegment${i}`}></div>)
							}
							return rv
						})()
					}
				</div>
				<div ref={weekOverlay}
					id='weekHighlight'>
					{/* <div id='weekHighlight'></div> */}
				</div>
			</div>
			<div id='bottomButtons'>
				<button className='whiteBlack'>Today</button>
				<button className='blackWhite' style={{ width: "100%" }}>Load calendar</button>
				<button className='blackWhite' style={{ width: "100%" }}>Delete calendar</button>
			</div>
		</div>
	)
}



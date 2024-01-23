import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { getMonday, getMonthDays, firstOfTheMonth, getNormalizedDay, isSameDay, nextWeek, prevMonth, nextMonth } from '../../utils/Date'
import "./Sidebar.css"
import { parseICal } from "../../model/Parsers"
import { getMonth } from 'date-fns'
import DeleteCalendarPopup from '../Popups/DeleteCalendarPopup/DeleteCalendarPopup'

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
export default function Sidebar({ currWeek, setCurrWeek, cal, setCal, calViewRef }) {




	const computeDays = () => {
		const tmpDate = new Date(month)
		tmpDate.setDate(1);
		const today = new Date()

		const rv = []
		let key = 0
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

	const [month, setMonth] = useState(firstOfTheMonth((currWeek)))
	const [popup, setPopup] = useState(false)
	const fileIn = useRef()

	const gridRef = useRef()
	const gridHover = useRef()
	const weekOverlay = useRef()
	const sidebar = useRef()
	const nRows = Math.ceil((getMonthDays(month, 0) + (month.getDay() == 0 ? 7 : month.getDay() - 1)) / 7)
	const firstDisplayedDay = (() => {
		const rv = new Date(month)
		rv.setDate(rv.getDate() - getNormalizedDay(rv) + 1)
		return rv
	})()

	const computeOverlay = () => {
		weekOverlay.current.style.display = "none"
		const rowsString = window.getComputedStyle(gridRef.current, null).getPropertyValue("grid-template-rows")
		const rows = rowsString.split(" ").map(value => parseInt(value, 10));


		gridHover.current.style.top = `${rows[0]}px`
		gridHover.current.style.gridTemplateRows = rowsString.substring(4)

		let tmpDate = new Date(firstDisplayedDay)
		for (let i = 1; i <= nRows; i++) {
			if (isSameDay(currWeek, tmpDate)) {
				// console.log(`match ${tmpDate}`)
				// console.log(rows)
				let top = 0;
				for (let j = 0; j < i; j++) {
					top += rows[j]
				}
				// console.log(top)
				weekOverlay.current.style.top = `${top}px`
				weekOverlay.current.style.height = `${rows[i]}px`
				weekOverlay.current.style.display = "block"
				break
			}
			tmpDate.setDate(tmpDate.getDate() + 7)
		}
	}

	useEffect(() => {
		computeOverlay()
	}, [currWeek, month])

	const calGridJSX = (
		<><div id='calGrid' ref={gridRef}>
			<h3 className='gridItem'>M</h3>
			<h3 className='gridItem'>T</h3>
			<h3 className='gridItem'>W</h3>
			<h3 className='gridItem'>T</h3>
			<h3 className='gridItem'>F</h3>
			<h3 className='gridItem'>S</h3>
			<h3 className='gridItem'>S</h3>
			{computeDays()}
		</div></>
	)

	const gridHoverJSX = (() => {
		month.setDate(1)
		const rv = []

		let tmpDate = new Date(firstDisplayedDay)
		for (let i = 0; i < nRows; i++) {
			const clojureDate = new Date(tmpDate)
			rv.push(<div className='gridHoverSegment'
				key={`gridHoverSegment${i}`}
				onClick={() => {
					setCurrWeek(clojureDate)
				}}
			></div>)
			tmpDate = nextWeek(tmpDate)
		}
		return (
			<div ref={gridHover} id="gridHover" >
				{rv}
			</div>
		)
	})()

	const handleFileUpload = (e) => {

		const callback = (name, events) => {
			cal.addCalendar(name, events)
			calViewRef.current.forceUpdate()
		}

		parseICal(e.target.files[0], callback)

	}

	return (
		<div className='sidebar' ref={sidebar}>
			<div id='date'>
				<h1 style={{ margin: "0" }}>
					{months.ita[month.getMonth()]}
				</h1>
				<h3 style={{ margin: "0", color: "var(--mflightgray)", padding: "0 0 0 20px" }}>
					{month.getFullYear()}
				</h3>
			</div>
			<div style={{ alignSelf: "flex-end", margin: "10px 0 10px 0" }}>
				<button id='prev' onClick={() => { setMonth(prevMonth(month)) }}>&lt;</button>
				<button id='next' onClick={() => { setMonth(nextMonth(month)) }}>&gt;</button>
			</div>
			<div style={{ width: "100%", position: "relative" }}>
				{calGridJSX}
				{gridHoverJSX}
				<div ref={weekOverlay}
					id='weekHighlight'>
				</div>
			</div>
			<div id='bottomButtons'>
				<button className='whiteBlack' onClick={() => { setCurrWeek(getMonday(new Date())); setMonth(firstOfTheMonth(new Date())) }}>Today</button>
				<input type="file" accept=".ics" style={{ display: "none" }} onChange={handleFileUpload} ref={fileIn} />
				{popup ? <DeleteCalendarPopup cal={cal} setPopup={setPopup} calViewRef={calViewRef} /> : null}
				<button className='blackWhite' onClick={() => fileIn.current.click()} >Upload calendar</button>
				<button className='blackWhite' onClick={() => setPopup(!popup)} style={{ zIndex: 3 }}>Delete calendar</button>
			</div>
		</div>
	)
}



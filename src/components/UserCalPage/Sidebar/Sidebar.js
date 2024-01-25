import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { getMonday, getMonthDays, firstOfTheMonth, getNormalizedDay, isSameDay, nextWeek, prevMonth, nextMonth } from '../../../utils/Date'
import "./Sidebar.css"
import { parseICal } from "../../../model/Parsers"
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
			rv.push(<div className='grayDays' key={key}>{getMonthDays(tmpDate, -1) - i + 1}</div>)
			key++;
		}

		if (tmpDate.getMonth() == today.getMonth()) {
			for (let i = 1; i < today.getDate(); i++) {
				rv.push(<div className='blackDays' key={key}>{i}</div>)
				key++;
			}
			rv.push(<div style={{ color: "var(--mfalmostwhite)", backgroundColor: "var(--mfgray)", padding: "5px", borderRadius: "7px" }}
				className='blackDays' key={key}>{today.getDate()}</div>)
			key++
			for (let i = today.getDate() + 1; i <= getMonthDays(tmpDate, 0); i++) {
				rv.push(<div className='blackDays' key={key}>{i}</div>)
				key++;
			}
		}
		else {
			for (let i = 1; i <= getMonthDays(tmpDate, 0); i++) {
				rv.push(<div className='blackDays' key={key}>{i}</div>)
				key++;
			}
		}
		let remainingDays = 7 - key % 7
		remainingDays = remainingDays == 7 ? 0 : remainingDays
		for (let i = 1; i <= remainingDays; i++) {
			rv.push(<div className='grayDays' key={key}>{i}</div>)
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
		const rows = rowsString.split(" ").map(value => parseFloat(value, 10));


		gridHover.current.style.top = `${rows[0]}px`
		gridHover.current.style.gridTemplateRows = rows.slice(1).join("px ") + "px"

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
	}, [currWeek, month, computeOverlay])

	const calGridJSX = (
		<><div id='calGrid' ref={gridRef}>
			<div className='gridItem'>M</div>
			<div className='gridItem'>T</div>
			<div className='gridItem'>W</div>
			<div className='gridItem'>T</div>
			<div className='gridItem'>F</div>
			<div className='gridItem'>S</div>
			<div className='gridItem'>S</div>
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
				<div style={{ margin: "0", color:"var(--mfdarkgray)", fontSize:"25px" }}>
					{months.ita[month.getMonth()]}
				</div>
				<div style={{ margin: "0", color: "var(--mflightgray)", padding: "0 0 0 20px" }}>
					{month.getFullYear()}
				</div>
			</div>
			<div style={{ padding:"20px 20px 0 20px", width:"100%", alignSelf: "center", margin: "10px 0 10px 0" }}>
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
				<button className='blackWhite' onClick={() => setPopup(!popup)} style={{ zIndex: 2 }}>Delete calendar</button>
			</div>
		</div>
	)
}



import React from 'react'
import { useState, useEffect } from 'react'
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
export default function Sidebar({ ...props }) {
	const [date, setDate] = useState(new Date(2023, 8, 13, 15, 0,0,0))
	useEffect(() => {
		console.log(date.getMonth())
	}
		, [])

	const getMonthDays = (date, offset) => {
		return (new Date(date.getFullYear(), date.getMonth() + 1 + offset, 0)).getDate()
	}

	const nextMonth = (date) => { 
		return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(),0,0,0,0)
	}
	const prevMonth = (date) => { 
		return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(),0,0,0,0)
	}

	const computeDays = () => {
		date.setDate(1);
		//console.log(getMonthDays(date, 0))
		console.log(date.getDay())
		const today = new Date()

		const rv = []
		let key = 0
		for (let i = date.getDay(); i > 0; i--) {
			rv.push(<h6 className='grayDays' key={key}>{getMonthDays(date, -1) - i + 1}</h6>)
			key++;
		}
		if (date.getMonth() == today.getMonth()) {
			for (let i = 1; i < today.getDate(); i++) {
				rv.push(<h6 className='blackDays' key={key}>{i}</h6>)
				key++;
			}
			rv.push(<h6 style={{ color: "var(--mfalmostwhite)", backgroundColor: "var(--mfgray)", padding: "5px", borderRadius: "7px" }}
				className='blackDays' key={key}>{today.getDate()}</h6>)
			key++
			for (let i = today.getDate() + 1; i <= getMonthDays(date, 0); i++) {
				rv.push(<h6 className='blackDays' key={key}>{i}</h6>)
				key++;
			}
		}
		else { 
			for (let i = 1; i <= getMonthDays(date, 0); i++) {
				rv.push(<h6 className='blackDays' key={key}>{i}</h6>)
				key++;
			}
		}
		const remainingDays = 7 - key % 7
		for (let i = 1; i <= remainingDays; i++) {
			rv.push(<h6 className='grayDays' key={key}>{i}</h6>)
			key++;
		}


		return rv
	}

	return (
			<div className='sidebar' >
				<div id='date'>
					<h1 style={{ margin: "0" }}>{months.ita[date.getMonth()]}</h1>
					<h3 style={{ margin: "0", color: "var(--mflightgray)", padding: "0 0 0 20px" }}>{date.getFullYear()}</h3>
				</div>
				<div style={{ alignSelf: "flex-end", margin: "10px 0 10px 0" }}>
				<button id='prev' onClick={() => {setDate(prevMonth(date))}}>&lt;</button>
				<button id='next' onClick={() => {setDate(nextMonth(date)) }}>&gt;</button>
				</div>
				<div id='calGrid'>
					<h3 className='gridItem'>M</h3>
					<h3 className='gridItem'>T</h3>
					<h3 className='gridItem'>W</h3>
					<h3 className='gridItem'>T</h3>
					<h3 className='gridItem'>F</h3>
					<h3 className='gridItem'>S</h3>
					<h3 className='gridItem'>S</h3>
					{computeDays()}
				</div>
				<div id='bottomButtons'>
					<button className='whiteBlack'>Today</button>
				<button className='blackWhite' style={{ width: "100%" }}>Load calendar</button>
				<button className='blackWhite' style={{width : "100%"}}>Delete calendar</button>
				</div>
			</div>
	)
}



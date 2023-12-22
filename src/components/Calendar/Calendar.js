import React, { useState } from 'react'
import "./Calendar.css"
import CalView from "../CalView"
import Toolbar from "../Toolbar"
import Sidebar from "../Sidebar"

export default function Calendar() {
	const [currWeek, setCurrWeek] = useState(new Date(2023, 11, 4, 1, 0, 0, 0))
	const changeWeek = (offset) => {
		const newDate = newDate(currWeek)
		newDate.setDate(currWeek.getDate() + 7 * offset)
		setCurrWeek(newDate)
	}

	return (
		<div className='vflex'>
			<Toolbar />
			<div className='hflex'>
				<CalView currWeek={currWeek} changeWeek={changeWeek}></CalView>
				<Sidebar currWeek={currWeek} changeWeek={changeWeek}/>
			</div>
		</div>
	)
}

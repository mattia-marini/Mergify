import React, { useState, useRef } from 'react'
import "./Calendar.css"
import CalView from "../CalView"
import Toolbar from "../Toolbar"
import Sidebar from "../Sidebar"
import Calendario from "../../../model/Calendario"

export default function Calendar() {
	const [currWeek, setCurrWeek] = useState(new Date(2023, 11, 4, 1, 0, 0, 0))
	const [cal, setCal] = useState(new Calendario())
	const calViewRef = useRef()



	const changeWeek = (offset) => {
		const newDate = newDate(currWeek)
		newDate.setDate(currWeek.getDate() + 7 * offset)
		setCurrWeek(newDate)
	}

	return (
		<div className='vflex'>
			<Toolbar />
			<div className='hflex'>
				<CalView currWeek={currWeek} changeWeek={changeWeek} cal={cal} ref={calViewRef}></CalView>
				<Sidebar currWeek={currWeek} setCurrWeek={setCurrWeek} cal={cal} setCal={setCal} calViewRef={calViewRef} />
			</div>
		</div>
	)
}

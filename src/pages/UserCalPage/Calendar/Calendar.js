import React, { useState, useRef } from 'react'
import Styles from "./Calendar.module.css"
import CalView from "../CalView"
import Toolbar from "../../../components/Toolbar"
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
		<div className={Styles.vflex}>
			<Toolbar left={"cal"}
				middle={<div style={{ textAlign: "center" }}> Mio calendario </div>}
				right={"user"}
			/>
			<div className={Styles.hflex}>
				<CalView currWeek={currWeek} changeWeek={changeWeek} cal={cal} ref={calViewRef}></CalView>
				<Sidebar currWeek={currWeek} setCurrWeek={setCurrWeek} cal={cal} setCal={setCal} calViewRef={calViewRef} />
			</div>
		</div>
	)
}

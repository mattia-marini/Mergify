import React from 'react'
import "./Calendar.css"
import CalView from "../CalView"
import Toolbar from "../Toolbar"
import Sidebar from "../Sidebar"

export default function Calendar() {
	return (
			<div className='vflex'>
				<Toolbar className='toolbar' ></Toolbar>
				<div className='hflex'>
					<CalView className='calView'></CalView>
					<Sidebar className='sidebar'></Sidebar>
				</div>
			</div>
	)
}

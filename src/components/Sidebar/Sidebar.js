import React from 'react'
import "./Sidebar.css"

export default function Sidebar({ ...props }) {
	return (
		<div className='sidebar' >
			<button id='prev'>&lt;</button>
			<button id='next'>&gt;</button>
		</div>
	)
}

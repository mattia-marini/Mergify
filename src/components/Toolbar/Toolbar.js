import React from 'react'
import "./Toolbar.css"

export default function Toolbar({ ...props }) {
	return (
		<div id='toolbar'>
			<div id='navigation'>
				<button id='myCal'> My cal </button>
				<button id='myGroups'> My groups </button>
			</div>
			<div id='tools'>
			</div>
			<div id='user'>
				<button id='pip'>
					M
				</button>
				<h2>Mario Rossi</h2>
			</div>
		</div>
	)
}

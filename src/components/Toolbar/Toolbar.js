import React from 'react'
import { useState } from 'react'
import "./Toolbar.css"
import AccountDetailsPopup from '../Popups/AccountDetailsPopup'

export default function Toolbar({ ...props }) {
	const [popup, setPopup] = useState(false)
	return (
		<div id='toolbar'>
			<div id='navigation'>
				<button id='myCal'> My cal </button>
				<button id='myGroups'> My groups </button>
			</div>
			<div id='tools'>
			</div>
			<div id='user'>
				<button
					onClick={() => setPopup(true)}
					id='pip'
				>
					M
				</button>
				{ popup ?  <AccountDetailsPopup setPopup={setPopup} /> : null }
				<h2>Mario Rossi</h2>
			</div>
		</div>
	)
}

import React from 'react'
import { useState } from 'react'
import "./Toolbar.css"
import AccountDetailsPopup from '../Popups/AccountDetailsPopup'

export default function Toolbar({ ...props }) {
	const [popup, setPopup] = useState(false)
	return (
		<div id='toolbar'>
			<div id='navigation'>
				<button className='blackButton' style={{borderRadius:0}}> My cal </button>
				<button className='whiteButton' style={{borderRadius:"0 10px 10px 0"}}> My groups </button>
			</div>
			<div id='tools' style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignContent: "center" }}>
				<div style={{textAlign:"center"}}>
					Mio calendario
				</div>
			</div>
			<div id='user'>
				<button
					onClick={() => setPopup(true)}
					className='whiteButton'
					style={{width:"50%", height:"100%", borderRadius:"10px 0 0 10px"}}
				>
					Mario Rossi
				</button>
				{popup ? <AccountDetailsPopup setPopup={setPopup} /> : null}
				<button
					className='blackButton'
					style={{width:"50%", height:"100%", borderRadius:"0 10px 10px 0"}}
				>Log out</button>
			</div>
		</div>
	)
}

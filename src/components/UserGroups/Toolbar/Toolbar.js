import React, { useRef } from 'react'
import { useState } from 'react'
import Styles from "./Toolbar.module.css"
import AccountDetailsPopup from '../../UserCalPage/Popups/AccountDetailsPopup'
import { Link } from 'react-router-dom'

export default function Toolbar({ ...props }) {

	const [popup, setPopup] = useState(false)
	const loginPageRef = useRef()
	const groupsPageRef = useRef()
	const calPageRef = useRef()

	return (
		<div id={Styles.toolbar}>
			<div id={Styles.navigation}>

				<Link to="/user-cal" style={{ display: "none" }} ref={calPageRef}></Link>
				<button onClick={() => calPageRef.current.click()} className='whiteButton' style={{ borderRadius: 0 }}> My cal </button>
				<Link to="/user-groups" style={{ display: "none" }} ref={groupsPageRef}></Link>
				<button onClick={() => groupsPageRef.current.click()} className='blackButton' style={{ borderRadius: "0 10px 10px 0" }}> My groups </button>
			</div>
			<div id={Styles.tools} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
				<input type="text" placeholder="Search for group" id={Styles.searchBar}/>
			</div>
			<div id={Styles.user}>
				<button
					onClick={() => setPopup(true)}
					className='whiteButton'
					style={{ width: "50%", height: "100%", borderRadius: "10px 0 0 10px" }}
				>
					Mario Rossi
				</button>
				{popup ? <AccountDetailsPopup setPopup={setPopup} /> : null}
				<Link to="/login" style={{ display: "none" }} ref={loginPageRef}></Link>
				<button
					className='blackButton'
					style={{ width: "50%", height: "100%", borderRadius: "0 10px 10px 0" }}
					onClick={() => { loginPageRef.current.click() }}
				>Log out</button>
			</div>
		</div>
	)
}

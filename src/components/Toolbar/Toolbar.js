import Styles from "./Toolbar.module.css"
import React, { useRef, useState } from 'react'
import AccountDetailsPopup from '../../pages/UserCalPage/Popups/AccountDetailsPopup'
import { Link } from 'react-router-dom'

export default function Toolbar({ left, middle, right }) {
	const [popup, setPopup] = useState(false)
	const loginPageRef = useRef()
	const groupsPageRef = useRef()
	const calPageRef = useRef()

	return (
		<div id={Styles.toolbar}>
			{(left == "cal" || left == "groups") ?
				<div id={Styles.navigation}>

					<Link to="/user-cal" style={{ display: "none" }} ref={calPageRef}></Link>
					<button onClick={() => calPageRef.current.click()} className={left == "cal"?'blackButton':"whiteButton"} style={{ borderRadius: 0 }}> My cal </button>
					<Link to="/user-groups" style={{ display: "none" }} ref={groupsPageRef}></Link>
					<button onClick={() => groupsPageRef.current.click()} className={left == "cal" ? 'whiteButton' : "blackButton"} style={{ borderRadius: "0 10px 10px 0" }}> My groups </button>
				</div> : left
			}
			<div id={Styles.middle} >
				{middle}
			</div>
			{right == "user" ?
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
				: right}
		</div >
	)
}

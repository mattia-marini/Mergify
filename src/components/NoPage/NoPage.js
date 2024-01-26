import React, { useContext, useRef } from 'react'
import Background from '../LoginPage/Background'
import Styles from "./NoPage.module.css"
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import { userContext } from '../../App'

export default function GoToLogin() {
	const loginPageRef = useRef()
	const calPageRef = useRef()

	const user = useContext(userContext)

	return (
		<Card background={<Background />}>
			<div id={Styles.vflex}>
				<div style={{ fontSize: "25px" }}>Error 404! No page</div>
				<div >The content you are looking for does not exist. Perhaps you typed a wrong url</div>
				<Link to="/login" style={{ display: "none" }} ref={loginPageRef}></Link>
				<Link to="/user-cal" style={{ display: "none" }} ref={calPageRef}></Link>
				<button
					onClick={() => {
						if (user) calPageRef.current.click()
						else loginPageRef.current.click()
					}}
					className="blackButton" >Return to the site</button>
			</div>
		</Card>
	)
}

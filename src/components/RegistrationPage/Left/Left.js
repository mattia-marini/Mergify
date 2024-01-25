import React, { useRef } from 'react'
import Styles from "./Left.module.css"
import { Link } from 'react-router-dom'

export default function Left() {
	const calPageRef = useRef()
	const registrationPageRef = useRef()
	const loginPageRef = useRef()

	const register = () => {
		//aggiungi utente in database con calendario vuoto
		calPageRef.current.click()
	}

	return (
		<div id={Styles.left}>

			<div>
				<img src="img/logo.svg" alt="Mergify logo" width="100" height="100" />
				<h1>
					<b>Create new account!</b>
				</h1>
			</div>
			<div id={Styles.inputs}>

				<div style={{ display: "flex", flexDirection: "column", gap: "20px", flexBasis: "60%", justifyContent: "space-between" }}>
					<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
						Email
						<input type="text" placeholder="Insert a valid email address" />
					</div>
					<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
						<input type="text" placeholder="Confirm email address" />
					</div>

					<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
						Password
						<input type="password" placeholder="Insert password" />
					</div>
					<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
						<input type="password" placeholder="Confirm password" />
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "20px", justifyContent: "space-between", flexBasis: "40%" }}>
					<div style={{ display: "flex" }}>
						<div style={{ flexGrow: 1 }}></div>
					</div>


					<div style={{display:"flex", gap:"20px"}}>
						<Link to="/login" style={{ display: "none" }} ref={loginPageRef}></Link>
						<button
							className="lightGrayButton"
							onClick={() => {loginPageRef.current.click()}}
						>Log in</button>
						<Link to="/user-cal" style={{ display: "none" }} ref={calPageRef}></Link>
						<button
							className="blackButton"
							onClick={register}
						>Register</button>
					</div>
					<div style={{ textAlign: "center" }}>
					</div>
				</div>

			</div>


		</div>

	)
}

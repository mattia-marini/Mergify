import React, { useRef } from 'react'
import Styles from "./Left.module.css"
import { Link } from 'react-router-dom'

export default function Left() {
	const calPageRef = useRef()
	const registrationPageRef = useRef()

	const logIn = () => {
		//check credenziali e database
		calPageRef.current.click()
	}

	return (
		<div id={Styles.left}>

			<div>
				<img src="img/logo.svg" alt="Mergify logo" width="100" height="100" />
				<h1>
					<b>Log in to mergify</b>
				</h1>
			</div>
			<div id={Styles.inputs}>

				<div style={{ display: "flex", flexDirection: "column", gap: "20px", flexBasis: "60%", padding: "60px 0", justifyContent: "space-between" }}>
					<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
						Email
						<input type="text" placeholder="Insert a valid email address" />
					</div>

					<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
						Password
						<input type="password" placeholder="Insert password" />
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "20px", justifyContent: "space-between", flexBasis: "40%" }}>
					<div style={{ display: "flex" }}>
						<input type="checkbox" id="remember-passsword" value="Remember" style={{ border: "2pt solid blue" }} />
						<label htmlFor="remember-passsword"> Remember password</label>
						<div style={{ flexGrow: 1 }}></div>
						<div>
							<button type="button" ><u>Reset password</u></button>
						</div>
					</div>

					<Link to="/user-cal" style={{ display: "none" }} ref={calPageRef}></Link>
					<button
						className="blackButton"
						onClick={logIn}
					>Log in</button>
					<div style={{ textAlign: "center" }}>
						<b>Don't have an account?</b>
						<Link to="/create-new-account" style={{ display: "none" }} ref={registrationPageRef}></Link>
						<button type="button"
							onClick={() => registrationPageRef.current.click()}
						><u>Create one</u></button>
					</div>
				</div>

			</div>


		</div>

	)
}

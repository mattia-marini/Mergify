import React from 'react'
import Left from "./Left"
import Right from "./Right"
import Background from "./Background"
import Styles from "./LoginPage.module.css"

export default function LoginPage() {
	return (
		<div id={Styles.main}>
			<Background />
			<div id={Styles.card} >
				{/* <Left /> */}
				{/* <div style={{ backgroundColor: "red", width:"100%" }}>dioca</div>
				<div style={{ backgroundColor: "blue",width:"100%" }}>dioc</div> */}
				<Left/>
				<Right/>
				{/* <Right/> */}
			</div>
		</div>
	)
}

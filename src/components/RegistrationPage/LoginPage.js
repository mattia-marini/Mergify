import React from 'react'
import Left from "./Left"
import Right from "./Right"
import Background from "./Background"
import Styles from "./LoginPage.module.css"

export default function LoginPage() {
	return (
		<div id={Styles.main}>
			<Background></Background>
			<div id={Styles.card} >
				<Left />
				<Right />
			</div>
		</div>
	)
}

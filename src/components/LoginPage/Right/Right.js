import React from 'react'
import Styles from "./Right.module.css"

export default function Right() {
	return (
		<div id={Styles.right} >
			<div style= {{
					width: "100%", height: "100%", display: "flex",
					justifyContent: "center",
					margin: 0,
					alignItems: "center",
					left: 0,
					top: 0,
					zIndex: 0, }}>
				{/* <img src="calendar.svg" alt="asdasd" width="600" height="600" style={{ opacity: 0.4 }} /> */}
			</div>

			<div style={{ position: "absolute" }}>
				<h1 style={{color: "white", padding: "0 50px", fontSize: "400%", fontWeight: "normal"}}>Planning at your fingertip</h1>
				<h2 style={{color: "white", padding: "0 50px", fontWeight: "300"}}>Load, invite, merge and plan!</h2>
			</div>
		</div>

	)
}

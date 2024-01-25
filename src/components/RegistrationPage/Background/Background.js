import React from 'react'
import Styles from "./Background.module.css"

export default function Background() {
	return (
		<div style={{ display: 'flex', position:"absolute", zIndex:"0" }}>
			<div id={Styles.left} ></div>
			<div id={Styles.right}>
				<div id={Styles.m}>M</div>
				<div id={Styles.circle}></div>
			</div>
		</div>
	)
}

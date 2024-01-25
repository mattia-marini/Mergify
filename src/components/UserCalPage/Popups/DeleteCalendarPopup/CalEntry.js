import React from 'react'
import { useState } from 'react'

export default function CalEntry({ name, cal, calViewRef, addEntry}) {
	const [hover, setHover] = useState(false)


	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				display: "flex", flexDirection: "row",  justifyContent: "space-between", backgroundColor: hover ? "var(--mfwhitegray)" : "transparent", boxSizing:"border-box", padding:"10px"}}>
			<div>
				{name == "addedManually" ? "Drawn events" : name.replace(/\.[^.]+$/, '')}
			</div>
			<div style={{ display: "flex", flexDirection: "row" }}>
				{hover ? <button
					onClick={() => { addEntry(name, true) }}
					style={{ boxSizing: "border-box", height: "10px" }}> - </button> : null}
			</div>
		</div>
	)
}

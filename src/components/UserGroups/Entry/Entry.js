import React from 'react'
import { useState } from 'react'

export default function CalEntry({ name, onDelete, params }) {
	const [hover, setHover] = useState(false)


	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: hover ? "var(--mfwhitegray)" : "transparent", boxSizing: "border-box", padding: "10px" }}>
			<div>
				{name}
			</div>
			<div style={{ display: "flex", flexDirection: "row" }}>
				{hover ? <button
					onClick={() => { if (onDelete) onDelete(...params) }}
					style={{ boxSizing: "border-box", height: "10px" }}> - </button> : null}
			</div>
		</div>
	)
}

import React, { useRef } from 'react'
import { useState } from 'react'

export default function CalEntry({ name, desc, onDelete, selected, ...props }) {
	const [hover, setHover] = useState(false)

	const textRef = useRef()

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			{...props}
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				backgroundColor: hover || selected ? "var(--mfwhitegray)" : "transparent",
				border: "1px solid transparent",
				borderColor: selected ? "var(--mfgray)" : "transparent",
				boxSizing: "content-box", padding: "10px"
			}}>
			<div ref={textRef} style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0 10px" }}>
				<div > {name} </div>
				<div style={{ fontSize: "10pt" }}> {desc} </div>
			</div>
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "center", boxSizing: "border-box" }}>
				{hover ? <button
					onClick={(e) => { e.stopPropagation(); if (onDelete) onDelete() }}
					style={{ boxSizing: "border-box", height: "100%", width: textRef.current.clientHeight }}> - </button> : null}
			</div>
		</div>
	)
}

import React, { useState } from 'react'
import Styles from "./Sidebar.module.css"
import Entry from "../Entry"

export default function Sidebar({onRemove, name, components,date, description }) {

	return (
		<div id={Styles.sidebar}>
			<div id={Styles.title}>{name}</div>
			<div id={Styles.hflex}>
				<div id={Styles.components}>
					<div style={{ padding: "10px 0", fontSize: "20px" }}>Components </div>
					<div>
						{components.map((c, i) => <Entry style={{ padding: "10px 20px 0 20px" }} key={i} name={c.name + " " + c.surname} />)}
					</div>
				</div>

				<div id={Styles.date}>
					<div style={{ padding: "10px 0", fontSize: "20px" }}>Date</div>
					<div style={{ padding: "0 20px" }}>{toString(date)}</div>
				</div>

				<div id={Styles.description}>
					<div style={{ padding: "10px 0", fontSize: "20px" }}>Description</div>
					<div style={{ padding: "0 20px" }}>{description}</div>
				</div>

				<div id={Styles.bottomButtons}>
					<button className='lightGrayButton'>Invite component</button>
					<button onClick={onRemove} className='blackButton'>Remove component</button>
				</div>
			</div>
		</div>
	)
}

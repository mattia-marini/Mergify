import React, { useState } from 'react'
import Styles from "./Sidebar.module.css"
import Entry from "../Entry"

export default function Sidebar() {

	const [components, setComponents] = useState(["Giuliano", "Mattia", "Elisa"])
	const [description, setDescription] = useState("Gruppo per organizzare compleanni e ingegneria del software")
	const [creationDate, setCreationDate] = useState(new Date())

	return (
		<div id={Styles.sidebar}>
			<div id={Styles.title}>Titolo</div>
			<div id={Styles.hflex}>
				<div id={Styles.components}>
					<div style={{ padding: "10px 0", fontSize: "20px" }}>Components </div>
					<div>
						{components.map((c, i) => <Entry style={{ padding: "10px 20px 0 20px" }} key={i} name={c} />)}
					</div>
				</div>

				<div id={Styles.date}>
					<div style={{ padding: "10px 0", fontSize: "20px" }}>Date</div>
					<div style={{ padding: "0 20px" }}>{toString(creationDate)}</div>
				</div>

				<div id={Styles.description}>
					<div style={{ padding: "10px 0", fontSize: "20px" }}>Description</div>
					<div style={{ padding: "0 20px" }}>{description}</div>
				</div>

				<div id={Styles.bottomButtons}>
					<button className='lightGrayButton'>Invite component</button>
					<button className='blackButton'>Remove component</button>
				</div>
			</div>
		</div>
	)
}

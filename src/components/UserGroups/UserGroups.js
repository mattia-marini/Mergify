import Styles from "./UserGroups.module.css"

import React, { useState } from 'react'
import Sidebar from "./Sidebar/Sidebar"

import Toolbar from "./Toolbar"

export default function UserGroups() {
	const [user, setUser] = useState()

	return (
		<div id={Styles.main}>
			<Toolbar />
			<div id={Styles.hflex}>
				<div style={{ backgroundColor: "lime", flexGrow: 1 }}></div>
				<Sidebar />
			</div>
		</div>
	)
}

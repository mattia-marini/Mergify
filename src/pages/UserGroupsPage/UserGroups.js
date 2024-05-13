import Styles from "./UserGroups.module.css"

import React, { useContext, useState } from 'react'
import Sidebar from "./Sidebar/Sidebar"

import Toolbar from "../../components/Toolbar"
import { userContext } from "../../App"
import Entry from "./Entry"
import Group from "../../model/Group"

export default function UserGroups() {
	const user = useContext(userContext)

	const [forceUpdateVar, setForceUpdateVar] = useState()
	const [selectedGroup, setSelectedGroup] = useState(null)
	const forceUpdate = () => setForceUpdateVar(!forceUpdateVar)

	console.log(selectedGroup)
	return (
		<div id={Styles.main}>
			<Toolbar left="groups" middle={
				<input type="text" placeholder="Search for group" id={Styles.input} />
			} right={"user"} />
			<div id={Styles.hflex}>
				<div id={Styles.groupList}>
					{user.groups.map((group, i) =>
						<Entry style={{ width: "100%" }} key={i}
							name={group.name}
							desc={group.description}
							selected={group == selectedGroup}
							onDelete={() => { user.deleteGroup(group); setSelectedGroup(null);  }}
							onClick={() => { setSelectedGroup(group) }}
						/>
					)}
				</div>
				{selectedGroup ?
					<Sidebar
						name={selectedGroup.name}
						description={selectedGroup.description}
						date={selectedGroup.date}
						components={selectedGroup.components}
						onRemove={() => { if (selectedGroup) { user.deleteGroup(selectedGroup); setSelectedGroup(null) } }} />
					: null
				}
			</div>
		</div>
	)
}

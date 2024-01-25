import React from 'react'
import { useState } from 'react'
import Styles from "./Styles"
import CalEntry from "./CalEntry"

export default function DeleteCalendarPopup({ cal, setPopup, calViewRef }) {

	const [deleteList, setDeleteList] = useState({})

	const addEntry = (key, newValue) => {
		setDeleteList(prevState => ({
			...prevState,
			[key]: newValue
		}));
	};

	const getList = () => {
		const rv = []
		Object.entries(cal.events).forEach(([name, values]) => {
			if (!deleteList[name])
				rv.push(<CalEntry key={name} name={name} cal={cal} calViewRef={calViewRef} addEntry={addEntry} />)
		})
		return rv
	}

	return (
		<div
			onClick={(e) => { if (e.target == e.currentTarget) setPopup(false) }}
			style={Styles.background}
		>
			<div
				style={Styles.externalFlex} >
				<div style={Styles.nameList}>
					{getList()}
				</div>
				<div style={Styles.buttons}>
					<button
						onClick={() => setPopup(false)}
						className="blackWhite" style={{ flexGrow: "1" }}>Cancel</button>
					<button
						onClick={() => {
							Object.entries(deleteList).forEach(([key, value]) => { cal.removeCalendar(key); })
							calViewRef.current.forceUpdate()
							setPopup(false)
						}}
						style={{ width: "100px" }} className="whiteBlack" >Ok</button>
				</div>
			</div>

		</div>
	)
}

import React from 'react'
import { useState } from 'react'
import Styles from "./DeleteCalendarPopup.module.css"
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
			className={Styles.background}
		>
			<div
				className={Styles.externalFlex} >
				<div className={Styles.nameList}>
					{getList()}
				</div>
				<div className={Styles.buttons}>
					<button
						onClick={() => setPopup(false)}
						className="blackWhite" style={{ flexGrow: "1" }}>Cancel</button>
					<button
						onClick={() => {
							Object.entries(deleteList).forEach(([key, value]) => { cal.removeCalendar(key); })
							calViewRef.current.forceUpdate()
							setPopup(false)
						}}
						className="whiteBlack" style={{ width: "100px" }}  >Ok</button>
				</div>
			</div>

		</div>
	)
}

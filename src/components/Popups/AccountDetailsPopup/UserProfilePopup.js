import React from 'react'
import Styles from "./Styles"

export default function UserProfilePopup({setPopup}) {
	return (
		<div
			onClick={(e) => { if (e.target == e.currentTarget) setPopup(false) }}
			style={Styles.background}
		>
			<div
				style={Styles.externalFlex} >
				<div style={Styles.buttons}>
					<button
						onClick={() => setPopup(false)}
						className="blackWhite" style={{ flexGrow: "1" }}>Cancel</button>
					<button
						onClick={() => {
							setPopup(false)
						}}
						style={{ width: "100px" }} className="whiteBlack" >Ok</button>
				</div>
			</div>

		</div>
	)
}

import React from 'react'
import Styles from "./Styles"

export default function UserProfilePopup({ setPopup }) {
	return (
		<div
			onClick={(e) => { if (e.target == e.currentTarget) setPopup(false) }}
			style={Styles.background}
		>
			<div style={Styles.externalFlex} >
				<div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"10px"}}>
					<button
						onClick={() => setPopup(true)}
						id='pip' >
						M
					</button>
					<div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
						Mario Rossi
					</div>
					<div style={{fontSize:"10pt"}}> mariorossi1965@gmail.com </div>
				</div>

				<div style={Styles.buttons}>
					<button
						onClick={() => setPopup(false)}
						className="blackWhite" style={{ width:"50%" }}>Cancel</button>
					<button
						onClick={() => setPopup(false)}
						style={{ width: "100px",width:"50%" }} className="whiteBlack" >Ok</button>
				</div>
			</div>

		</div>
	)
}

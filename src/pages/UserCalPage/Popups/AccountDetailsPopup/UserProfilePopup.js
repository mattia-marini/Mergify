import React from 'react'
import styles from "./UserprofilePopup.module.css"

export default function UserProfilePopup({ setPopup }) {
	return (
		<div
			className={styles.background}
			onClick={(e) => { if (e.target == e.currentTarget) setPopup(false) }}
		>
			<div className={styles.externalFlex} >
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
					<button id={styles.pip} onClick={() => setPopup(true)} >
						M
					</button>
					<div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
						Mario Rossi
					</div>
					<div style={{ fontSize: "10pt" }}> mariorossi1965@gmail.com </div>
				</div>

				<div className={styles.buttons}>
					<button
						onClick={() => setPopup(false)}
						className="lightGrayButton" style={{ width: "50%" }}>Cancel</button>
					<button
						onClick={() => setPopup(false)}
						style={{ width: "100px", width: "50%" }} className="blackButton" >Ok</button>
				</div>
			</div>

		</div>
	)
}

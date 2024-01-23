export default {

	background: {
		width: "100vw",
		height: "100vh",
		position: "absolute",
		backgroundColor: "rgba(0,0,0,0.5)",
		display: 'flex',
		top: 0,
		left: 0,
		zIndex: 3,
		alignItems: "center",
		justifyContent: "center"
	},

	externalFlex: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
		width: "40vw",
		borderRadius: "7px",
		padding: 20,
		boxSizing: 'border-box',
		backgroundColor: "var(--mfalmostwhite)",
		opacity: 1,
		zIndex: 3,
		overflow: "auto"
	},

	nameList: {
		display: "flex",
		flexDirection: "column",
		overflow: "auto",
		width: "100%",
		height: "100%",
		padding: 20,
		minHeight: 0,
		boxSizing: 'border-box',
		backgroundColor: "var(--mfalmostwhite)",
		opacity: 1,
		zIndex: 3,
		flexShrink: 1,
		overflow:"auto",
		borderTop: "1pt solid var(--mfdarkgray)",
		borderBottom: "1pt solid var(--mfdarkgray)"
	},

	buttons: {
		display: "flex",
		gap: 10,
		minHeight: "fit-content",
		flexShrink: 1,
		flexDirection: "row",
	}

}
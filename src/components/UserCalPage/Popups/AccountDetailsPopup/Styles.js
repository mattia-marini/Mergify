export default {
	background: {
		width: "100vw",
		height: "100vh",
		position: "absolute",
		backgroundColor: "rgba(0,0,0,0.5)",
		display: 'flex',
		top: 0,
		left: 0,
		zIndex: 4,
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
	buttons: {
		display: "flex",
		gap: 10,
		minHeight: "fit-content",
		flexShrink: 1,
		flexDirection: "row",
	}
}
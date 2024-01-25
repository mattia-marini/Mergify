import './App.css';
import UserCal from "./components/UserCalPage"
import { format, isMonday } from 'date-fns'
import { useEffect } from "react"

function App() {

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<UserCal />
		</div>
	);
}


export default App;

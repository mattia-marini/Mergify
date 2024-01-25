import './App.css';
import Calendar from "./components/UserCalPage/Calendar"
import { format, isMonday } from 'date-fns'
import { useEffect } from "react"

function App() {

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<Calendar />
		</div>
	);
}


export default App;

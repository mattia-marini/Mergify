import './App.css';
import UserCal from "./components/UserCalPage"
import LoginPage from "./components/LoginPage"
import { format, isMonday } from 'date-fns'
import { useEffect } from "react"

function App() {

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			{/* <UserCal /> */}
			<LoginPage></LoginPage>
		</div>
	);
}


export default App;

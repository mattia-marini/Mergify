import './App.css';
import UserCal from "./components/UserCalPage"
import LoginPage from "./components/LoginPage"
import { format, isMonday } from 'date-fns'
import { Route, Routes } from 'react-router-dom'

function App() {

	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/user-cal' element={
				<div style={{ width: "100vw", height: "100vh" }}>
					<UserCal />
				</div>
			} />
		</Routes>
	);
}


export default App;

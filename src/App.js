import './App.css';
import UserCal from "./components/UserCalPage"
import LoginPage from "./components/LoginPage"
import RegistrationPage from "./components/RegistrationPage"
import { format, isMonday } from 'date-fns'
import { Route, Routes } from 'react-router-dom'

function App() {

	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/user-cal' element={ <UserCal /> } />
			<Route path='/create-new-account' element={ <RegistrationPage/> } />
		</Routes>
	);
}


export default App;

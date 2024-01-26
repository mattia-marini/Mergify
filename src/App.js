import './App.css';

import UserCal from "./components/UserCalPage"
import LoginPage from "./components/LoginPage"
import RegistrationPage from "./components/RegistrationPage"
import UserGroups from "./components/UserGroups"
import GoToLoginPage from "./components/GoToLoginPage"
import NoPage from "./components/NoPage"

import React, { useState } from 'react';
import { format, isMonday } from 'date-fns'
import { Route, Routes } from 'react-router-dom'


export const userContext = React.createContext()

function App() {

	const [user, setUser] = useState(null)

	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/create-new-account' element={ <RegistrationPage/> } />
			<Route path='/user-cal' element={ <UserCal /> } />
			<Route path='/user-groups' element={ <UserGroups/> } />
			<Route path='/*' element={ <NoPage/> } />
		</Routes>
	);
}


export default App;

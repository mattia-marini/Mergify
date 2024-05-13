import './App.css';

import UserCal from "./components/UserCalPage"
import LoginPage from "./components/LoginPage"
import RegistrationPage from "./components/RegistrationPage"
import UserGroups from "./components/UserGroups"
import GoToLoginPage from "./components/GoToLoginPage"
import NoPage from "./components/NoPage"
import User from "./model/User"


import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import Group from './model/Group';


export const userContext = React.createContext()

function App() {

	const [user, setUser] = useState(new User("Marini", "Mattia", "mattiamarini@gmail.com"))
	user.addToGroup(new Group("Calcetto", "descrizione calcetto"))
	user.addToGroup(new Group("Scuola", "descrizione scuola"))
	user.addToGroup(new Group("Lavoro", "descrizione lavoro"))
	// const [user, setUser] = useState()

	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/create-new-account' element={<RegistrationPage />} />
			{user ?
				<>
					<Route path='/user-cal' element={<userContext.Provider value={user}><UserCal /></userContext.Provider>} />
					<Route path='/user-groups' element={<userContext.Provider value={user}><UserGroups /></userContext.Provider>} />
				</> :
				<>
					<Route path='/user-cal' element={<GoToLoginPage />} />
					<Route path='/user-groups' element={<GoToLoginPage />} />
				</>
			}
			<Route path='/*' element={<userContext.Provider value={user}><NoPage /></userContext.Provider>} />
		</Routes>
	);
}


export default App;

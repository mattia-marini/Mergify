import React, { useRef } from 'react'
import Background from '../LoginPage/Background'
import Styles from "./GoToLoginPage.module.css"
import { Link } from 'react-router-dom'
import Card from '../Card/Card'

export default function GoToLogin() {
  const loginPageRef = useRef()
  const registerPageRef = useRef()

  return (
    <Card background={<Background />}>
      <div id={Styles.vflex}>
        <div style={{ fontSize: "25px" }}>Login to Mergify!</div>
        <div >You need an account to use mergify. Please log in or create an account to continue</div>
        <div id={Styles.buttons}>
          <Link to="/login" style={{ display: "none" }} ref={loginPageRef}></Link>
          <button
            onClick={() => { registerPageRef.current.click() }}
            className="lightGrayButton" >Register</button>
          <Link to="/create-new-account" style={{ display: "none" }} ref={registerPageRef}></Link>
          <button
            onClick={() => { loginPageRef.current.click() }}
            className="blackButton" >Log in</button>
        </div>
      </div>
    </Card>
  )
}

import React from 'react'
import Styles from "./Card.module.css"

export default function Card({ children, background }) {
  return (
    <div id={Styles.container}>
      {background}
      <div id={Styles.card}>
        {children}
      </div>
    </div>
  )
}

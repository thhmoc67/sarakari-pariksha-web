import React from 'react'
import {menulist} from './constants'
import styles from './Layout.module.css'

function Navbar() {
  const menu = menulist.map(item => (
    <li key={item.key} className={styles.list}>
      {item.label}
    </li>
  ))
  return (
    <header>
      <ul className={ styles.ul}>{menu}</ul>
    </header>
  )
}

export default Navbar

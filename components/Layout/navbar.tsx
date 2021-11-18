import React from 'react'
import {menulist} from './constants'
import styles from './Layout.module.css'
import Link from 'next/link'

function Navbar() {
  const menu = menulist.map(item => (
    <Link key={item.key} href={item.route} passHref>
      <li className={styles.list}>{item.label}</li>
    </Link>
  ))
  return (
    <header>
      <ul className={styles.ul}>{menu}</ul>
    </header>
  )
}

export default Navbar

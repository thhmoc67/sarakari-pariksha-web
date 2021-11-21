import Link from 'next/link'
import React from 'react'
import {adminMenulist} from './adminMenuList'

const Header = () => {
  const menu = adminMenulist.map(item => (
    <Link key={item.key} href={item.route} passHref>
      <li>{item.label}</li>
    </Link>
  ))
  return (
    <div className='admin-header'>
      <ul>{menu}</ul>
    </div>
  )
}

export default Header

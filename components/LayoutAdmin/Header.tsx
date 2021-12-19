import {LogoutOutlined} from '@mui/icons-material'
import Link from 'next/link'
import React from 'react'
import {adminMenulist} from './adminMenuList'

const Header = () => {
  const menu = adminMenulist.map(item => (
    <Link key={item.key} href={item.route} passHref>
      <li>{item.label}</li>
    </Link>
  ))

  function onSignOut() {
    localStorage.clear()
    location.reload()
  }
  return (
    <div className="admin-header">
      <ul>
        {menu}

        <li style={{display: 'flex'}}>
          <LogoutOutlined fontSize={'small'} />
          <span style={{marginLeft: 4}} onClick={onSignOut}>
            SignOut
          </span>
        </li>
      </ul>
    </div>
  )
}

export default Header

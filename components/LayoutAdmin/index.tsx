import React from 'react'
import Header from './Header'

const LayoutAdmin = ({children}: any) => {
  return (
    <div className="admin-wrapper">
      <Header />
      {children}
    </div>
  )
}

export default LayoutAdmin

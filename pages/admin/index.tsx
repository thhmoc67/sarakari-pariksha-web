import React from 'react'
import LayoutAdmin from '../../components/LayoutAdmin'
import Admin from '../../containers/Admin'
// import type {NextPage} from 'next'
// import Head from 'next/head'
// interface Props {}

const AdminPage= () => {
  return (
    <LayoutAdmin>
      <Admin />
    </LayoutAdmin>
  )
}

// AdminPage.getInitialProps = async ({req}: any) => {
//   return {}
// }

export default AdminPage

import React from 'react'
import Login from '../../../containers/Admin/Login'

import type {NextPage} from 'next'
// import Head from 'next/head'
interface Props {}

const AdminPage: NextPage<Props> = () => {
  return <Login />
}

AdminPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default AdminPage

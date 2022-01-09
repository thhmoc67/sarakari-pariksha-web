import React from 'react'
import type {NextPage} from 'next'
import Notifications from '../../../containers/Admin/Notifications'
import LayoutAdmin from '../../../components/LayoutAdmin'

interface Props {}

const NotificationPage: NextPage<Props> = () => {
  return (
    <LayoutAdmin>
      <Notifications />
    </LayoutAdmin>
  )
}

NotificationPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default NotificationPage

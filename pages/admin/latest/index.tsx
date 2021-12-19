import React from 'react'
import type {NextPage} from 'next'
import LatestUpdates from '../../../containers/Admin/LatestUpdates'
import LayoutAdmin from '../../../components/LayoutAdmin'

interface Props {}

const LatestUpdatePage: NextPage<Props> = () => {
  return (
    <LayoutAdmin>
      <LatestUpdates />
    </LayoutAdmin>
  )
}

LatestUpdatePage.getInitialProps = async ({req}: any) => {
  return {}
}

export default LatestUpdatePage

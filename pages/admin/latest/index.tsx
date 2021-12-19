import React from 'react'
import type {NextPage} from 'next'
import LatestUpdates from '../../../containers/Admin/LatestUpdates'

interface Props {}

const LatestUpdatePage: NextPage<Props> = () => {
  return <LatestUpdates />
}

LatestUpdatePage.getInitialProps = async ({req}: any) => {
  return {}
}

export default LatestUpdatePage

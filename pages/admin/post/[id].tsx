import React from 'react'
import LayoutAdmin from '../../../components/LayoutAdmin'
import PostEdit from '../../../containers/Admin/PostEdit'
import type {NextPage} from 'next'
import Head from 'next/head'

interface Props {}
const EditPostPage: NextPage<Props> = () => {
  return (
    <LayoutAdmin>
      <PostEdit />
    </LayoutAdmin>
  )
}

EditPostPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default EditPostPage

import React from 'react'
import LayoutAdmin from '../../../components/LayoutAdmin'
import PostList from '../../../containers/Admin/PostList'
import type {NextPage} from 'next'
import Head from 'next/head'

interface Props {}

const PostListPage: NextPage<Props> = () => {
  return (
    <LayoutAdmin>
      <PostList />
    </LayoutAdmin>
  )
}

PostListPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default PostListPage

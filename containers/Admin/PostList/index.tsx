import {AddCircleOutlined} from '@mui/icons-material'
import {Button, IconButton} from '@mui/material'
import type {NextPage} from 'next'
import React from 'react'
import AddNewPost from './AddNewPost'
import {postList} from './constants'
import PostTable from './PostTable'

const PostList: NextPage = () => {
  function handleAddnew() {
    alert('clicked')
  }

  return (
    <div className='admin-post-list'>
      <AddNewPost />
      <PostTable rows={postList} />
    </div>
  )
}

export default PostList

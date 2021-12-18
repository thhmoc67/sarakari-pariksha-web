import {AddCircleOutlined, ContactSupportOutlined} from '@mui/icons-material'
import {Button, IconButton} from '@mui/material'
import type {NextPage} from 'next'
import React from 'react'
import AddNewPost from './AddNewPost'
// import {postList} from './constants'
import PostTable from './PostTable'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {collection, addDoc, getDocs} from 'firebase/firestore'
import {firebaseConfig} from '../../../config/firebase'

const PostList: NextPage = () => {
  const [postsList, setPostsList] = React.useState<any>([])
  let firebaseApp = React.useRef<unknown>()
  let db = React.useRef<any>()

  function firebaseSetup() {
    firebaseApp.current = initializeApp(firebaseConfig)
    db.current = getFirestore()

    getPosts()
  }

  async function getPosts() {
    const querySnapshot = await getDocs(collection(db.current, 'posts'))
    const list: any = []
    querySnapshot.forEach(doc => {
      list.push({...doc.data(), id: doc.id})
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
    })

    setPostsList(list)
  }

  React.useEffect(() => {
    firebaseSetup()
    return () => {}
  }, [])

  return (
    <div className="admin-post-list">
      <AddNewPost db={db} getPosts={getPosts} />
      <PostTable rows={postsList} />
    </div>
  )
}

export default PostList

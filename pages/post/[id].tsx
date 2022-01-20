import React from 'react'
import Layout from '../../components/Layout'
import type {NextPage} from 'next'
import Head from 'next/head'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {collection, setDoc} from 'firebase/firestore'
import {firebaseConfig} from '../../config/firebase'
import {doc, getDoc} from 'firebase/firestore'
import PostPreview from '../../components/PostPreview'

interface Props {
  post?: any
}

const PostPage: NextPage<Props> = props => {
  return (
    <div>
      <Head>
        <title>Sarkari Pariksa | {props?.post?.post_name}</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PostPreview data={props?.post} />
      </Layout>
    </div>
  )
}

async function fetchPost(id: string) {
  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore()

  const docRef = doc(db, 'posts', id)

  const docSnap = await getDoc(docRef)

  if (docSnap?.exists()) {
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
    return {}
  }
}

PostPage.getInitialProps = async ({req}: any) => {
  const id = req.url.split('/')[req.url.split('/').length - 1]
  const post = await fetchPost(id)
  return {post}
}

export default PostPage

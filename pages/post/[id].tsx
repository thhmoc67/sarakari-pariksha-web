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

interface Props {}

const PostPage: NextPage<Props> = props => {
  const [post, setPost] = React.useState<any>({})
  async function fetchPost() {
    const firebaseApp = initializeApp(firebaseConfig)
    const db = getFirestore()

    const docRef = doc(
      db,
      'posts',
      location.pathname.split('/')[location.pathname.split('/').length - 1],
    )

    const docSnap = await getDoc(docRef)

    if (docSnap?.exists()) {
      const data = docSnap.data()
      setPost(data)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }
  React.useEffect(() => {
    fetchPost()
    return () => {}
  }, [])
  return (
    <div>
      <Head>
        <title>Sarkari Pariksa | {post?.post_name}</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PostPreview data={post} />
      </Layout>
    </div>
  )
}

PostPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default PostPage

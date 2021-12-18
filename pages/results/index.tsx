import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
// import {collection, setDoc} from 'firebase/firestore'
import {firebaseConfig} from '../../config/firebase'
import {collection, query, where, getDocs} from 'firebase/firestore'
import Link from 'next/link'
import PostTitleListCard from '../../components/PostTitleListCard'

interface Props {
  results: any
}

const Results: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksha | Results</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Results</h1>
        <PostTitleListCard results={props?.results} />
      </Layout>
    </>
  )
}

Results.getInitialProps = async ({req}: any) => {
  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore()
  const q = query(
    collection(db, 'posts'),
    where('tags', 'array-contains', 'syllabus'),
  )

  const querySnapshot = await getDocs(q)

  const list: any = []
  querySnapshot.forEach(doc => {
    console.log(doc.id, ' => ', doc.data())

    list.push({
      id: doc.id,
      title: doc.data().title,
    })
  })

  return {results: list}
}

export default Results

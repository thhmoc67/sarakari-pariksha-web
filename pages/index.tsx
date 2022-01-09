import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Home from '../containers/Home'
import {initializeApp} from 'firebase/app'
import {getDoc, doc, getFirestore} from 'firebase/firestore'
import {firebaseConfig} from '../config/firebase'
import {collection, getDocs} from 'firebase/firestore'
import {useEffect, useState} from 'react'

interface Props {}

const App: NextPage<Props> = props => {
  const [results, setResults] = useState({})
  const [latestUpdates, setLatestUpdates] = useState([])

  async function getUpdates() {}

  async function getAllResults() {
    const firebaseApp = initializeApp(firebaseConfig)
    const db = getFirestore()
    const querySnapshot = await getDocs(collection(db, 'posts'))

    const docRef = await doc(db, 'common', 'latest')
    const docSnap = await getDoc(docRef)
    if (docSnap?.exists()) {
      const data = docSnap.data()
      console.log( data?.updates
        ?.sort((a, b) => b?.created_at?.seconds - a?.created_at?.seconds))
      setLatestUpdates(
        data?.updates
          ?.sort((a, b) => b?.created_at?.seconds - a?.created_at?.seconds)
          .slice(0, 8),
      )
    } else {
    }

    const list: any = []
    querySnapshot.forEach(doc => {
      list.push({...doc.data(), id: doc.id})
    })
    const results: any = {
      latestjobs: list
        .filter((item: any) => item.tags?.includes('latest jobs'))
        .sort((a: any, b: any) => b.created_at.seconds - a.created_at.seconds)
        .slice(0, 9),
      results: list
        .filter((item: any) => item.tags?.includes('results'))
        .sort((a: any, b: any) => b.created_at.seconds - a.created_at.seconds)
        .slice(0, 9),
      admitcard: list
        .filter((item: any) => item.tags?.includes('admit card'))
        .sort((a: any, b: any) => b.created_at.seconds - a.created_at.seconds)
        .slice(0, 9),
      answerkey: list
        .filter((item: any) => item.tags?.includes('answer key'))
        .sort((a: any, b: any) => b.created_at.seconds - a.created_at.seconds)
        .slice(0, 9),
      syllabus: list
        .filter((item: any) => item.tags?.includes('syllabus'))
        .sort((a: any, b: any) => b.created_at.seconds - a.created_at.seconds)
        .slice(0, 9),
      admission: list
        .filter((item: any) => item.tags?.includes('admission'))
        .sort((a: any, b: any) => b.created_at.seconds - a.created_at.seconds)
        .slice(0, 9),
    }
    setResults(results)
  }
  useEffect(() => {
    getAllResults()
    return () => {}
  }, [])
  return (
    <>
      <Head>
        <title>Sarkari Pariksha</title>
        <meta name="description" content="Sarkari Pariksha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Home results={results} updates={latestUpdates} />
      </Layout>
    </>
  )
}

App.getInitialProps = async ({req}: any) => {
  return {}
}

export default App

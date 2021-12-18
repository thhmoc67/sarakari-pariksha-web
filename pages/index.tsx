import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Home from '../containers/Home'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
// import {collection, setDoc} from 'firebase/firestore'
import {firebaseConfig} from '../config/firebase'
import {collection, query, where, getDocs} from 'firebase/firestore'
import {tagsList} from '../config/constants/tags'

interface Props {
  results: any
}

const App: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksa</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Home results={props.results} />
      </Layout>
    </>
  )
}

App.getInitialProps = async ({req}: any) => {
  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore()
  const querySnapshot = await getDocs(collection(db, 'posts'))

  const list: any = []
  querySnapshot.forEach(doc => {
    list.push({...doc.data(), id: doc.id})
  })

  return {
    results: {
      latestjobs: list.filter((item: any) =>
        item.tags?.includes('latest jobs'),
      ),
      results: list.filter((item: any) => item.tags?.includes('results')),
      admincard: list.filter((item: any) => item.tags?.includes('admin card')),
      answerkey: list.filter((item: any) => item.tags?.includes('answer key')),
      syllabus: list.filter((item: any) => item.tags?.includes('syllabus')),
      admission: list.filter((item: any) => item.tags?.includes('admission')),
    },
  }
}

export default App

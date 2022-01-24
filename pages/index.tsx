import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Home from '../containers/Home'
import {initializeApp} from 'firebase/app'
import {getDoc, doc, getFirestore} from 'firebase/firestore'
import {firebaseConfig} from '../config/firebase'
import {collection, getDocs} from 'firebase/firestore'

interface Props {
  latestUpdates: any
  results: any
  notifications?: any
}

const App: NextPage<Props> = ({
  latestUpdates = [],
  results = {},
  notifications = [],
}) => {
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
  let notifications, latestUpdates, results

  async function getAllResults() {
    const firebaseApp = initializeApp(firebaseConfig)
    const db = getFirestore()
    const querySnapshot = await getDocs(collection(db, 'posts'))

    const docRef = await doc(db, 'common', 'latest')
    const docSnap = await getDoc(docRef)
    if (docSnap?.exists()) {
      const data = docSnap.data()
      latestUpdates = data?.updates
        ?.sort(
          (a: any, b: any) => b?.created_at?.seconds - a?.created_at?.seconds,
        )
        .slice(0, 8)
    } else {
    }

    const notificationRef = await doc(db, 'common', 'notifications')
    const notificationSnap = await getDoc(notificationRef)
    if (notificationSnap?.exists()) {
      const data = notificationSnap.data()
      notifications = data?.notifications?.sort(
        (a: any, b: any) => b?.created_at?.seconds - a?.created_at?.seconds,
      )
    } else {
      notifications = []
    }

    const list: any = []
    querySnapshot.forEach(doc => {
      list.push({...doc.data(), id: doc.id})
    })

    results = {
      notifications,
      latestjobs: list
        .filter((item: any) => item.tags?.includes('latest jobs'))
        .sort((a: any, b: any) =>
          sortingTags(a.tagDates['latest jobs'], b.tagDates['latest jobs']),
        )
        .slice(0, 9),
      results: list
        .filter((item: any) => item.tags?.includes('results'))
        .sort((a: any, b: any) =>
          sortingTags(a.tagDates['results'], b.tagDates['results']),
        )
        .slice(0, 9),
      admitcard: list
        .filter((item: any) => item.tags?.includes('admit card'))
        .sort((a: any, b: any) =>
          sortingTags(a.tagDates['admit card'], b.tagDates['admit card']),
        )
        .slice(0, 9),
      answerkey: list
        .filter((item: any) => item.tags?.includes('answer key'))
        .sort((a: any, b: any) =>
          sortingTags(a.tagDates['answer key'], b.tagDates['answer key']),
        )
        .slice(0, 9),
      syllabus: list
        .filter((item: any) => item.tags?.includes('syllabus'))
        .sort((a: any, b: any) =>
          sortingTags(a.tagDates['syllabus'], b.tagDates['syllabus']),
        )
        .slice(0, 9),
      admission: list
        .filter((item: any) => item.tags?.includes('admission'))
        .sort((a: any, b: any) =>
          sortingTags(a.tagDates['admission'], b.tagDates['admission']),
        )
        .slice(0, 9),
    }
  }
  await getAllResults()

  return {
    latestUpdates,
    results,
    notifications,
  }
}

export function sortingTags(a: number, b: number) {
  console.log(new Date(a).getTime(), new Date(b).getTime())
  return new Date(b).getTime() - new Date(a).getTime()
}

export default App

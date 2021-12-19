import React from 'react'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {firebaseConfig} from '../../config/firebase'
import {collection, query, where, getDocs} from 'firebase/firestore'
import PostTitleListCard from '../../components/PostTitleListCard'

const AnswerkeyPage = props => {
  const [results, setResults] = React.useState([])

  async function fetchResults() {
    const firebaseApp = initializeApp(firebaseConfig)
    const db = getFirestore()
    const q = query(
      collection(db, 'posts'),
      where('tags', 'array-contains', props.tag),
    )

    const querySnapshot = await getDocs(q)

    const list = []
    querySnapshot.forEach(doc => {
      list.push({
        id: doc.id,
        title: doc.data().post_name,
      })
    })
    setResults(list)
  }

  React.useEffect(() => {
    fetchResults()
    return () => {}
  }, [])
  return (
    <>
      <PostTitleListCard results={results} />
    </>
  )
}

export default AnswerkeyPage

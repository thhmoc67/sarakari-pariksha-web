import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {firebaseConfig} from '../config/firebase'
import {collection, query, where, getDocs} from 'firebase/firestore'

export async function fetchPostResults(tag) {
  const firebaseApp = initializeApp(firebaseConfig)
  const db = getFirestore()
  const q = query(collection(db, 'posts'), where('tags', 'array-contains', tag))

  const querySnapshot = await getDocs(q)

  const list = []
  querySnapshot.forEach(doc => {
    const data = doc.data()
    list.push({
      id: doc.id,
      title: data.post_name,
      isNew: data.isNew,
      created_at: data.created_at,
    })
  })
  return list.sort((a, b) => b.created_at.seconds - a.created_at.seconds)
}

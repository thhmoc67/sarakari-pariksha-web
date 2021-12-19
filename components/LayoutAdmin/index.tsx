import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import React from 'react'
import Header from './Header'
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '../../config/firebase'
import Login from '../../containers/Admin/Login'

const LayoutAdmin = ({children}: any) => {
  const [loading, setLoading] = React.useState(true)
  const [allowed, setAllowed] = React.useState(false)

  async function verifyAdmin() {
    const token = localStorage.getItem('token')
    console.log(token)
    try {
      const db = getFirestore()
      const q = query(collection(db, 'admins'), where('token', '==', token))
      const docSnap = await getDocs(q)
      setLoading(false)
      if (!!docSnap.size) {
        setAllowed(true)
        return
      }
      setAllowed(false)
    } catch (e) {
      setLoading(false)
      setAllowed(false)
      return false
    }
  }

  React.useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig)
    verifyAdmin()
  }, [])
  if (loading) return <div>loading...</div>
  return (
    <div className="admin-wrapper">
      {allowed ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default LayoutAdmin

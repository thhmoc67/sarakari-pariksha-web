import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '../../../config/firebase'
import {getFirestore, doc} from 'firebase/firestore'
import {getDocs, where, collection, query, setDoc} from 'firebase/firestore'

const Login = () => {
  const userid = React.useRef(null)
  async function setToken(name, email, token) {
    try {
      console.log('setToken', token)
      const db = getFirestore()
      const adminRef = collection(db, 'admins')
      await setDoc(doc(adminRef, userid.current), {token, name, email})
      // console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error(e)
    }
  }

  async function verifyAdmin(email) {
    try {
      const db = getFirestore()
      const q = query(collection(db, 'admins'), where('email', '==', email))
      const docSnap = await getDocs(q)
      if (!!docSnap.size) {
        docSnap.forEach(doc => {
          userid.current = doc.id
        })
        return true
      }
      return false
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async function handleLogin() {
    try {
      const firebaseApp = initializeApp(firebaseConfig)
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      signInWithPopup(auth, provider)
        .then(async result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          // The signed-in user info.
          console.log(result.user)
          const email = result.user.email
          const name = result.user.displayName

          const isAllowed = await verifyAdmin(email)
          console.log(isAllowed)
          if (isAllowed) {
            await setToken(name, email, token)
            localStorage.setItem('token', token)
            localStorage.setItem('email', email)
            location.reload()
          }
        })
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.email
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error)
          // ...
        })
    } catch (e) {
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
      }}>
      <button style={{margin: 'auto', height: 50}} onClick={handleLogin}>
        Sign with google
      </button>
    </div>
  )
}

export default Login

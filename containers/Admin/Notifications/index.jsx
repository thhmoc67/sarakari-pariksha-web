import { Box, Button, Grid, Modal } from '@mui/material'
import React from 'react'
import AddData from '../PostEdit/AddData'
import CloseIcon from '@mui/icons-material/Close'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { collection, setDoc } from 'firebase/firestore'
import { firebaseConfig } from '../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import NotificationsCompnent from '../../../components/Notifications'

const Notifications = () => {
  const [notifications, setNotifications] = React.useState([])
  const [preview, setPreview] = React.useState(false)
  const [loader, setLoader] = React.useState(false)
  const db = React.useRef(null)

  async function dbUpdate() {
    setLoader(true)
    try {
      const postRef = collection(db.current, 'common')

      await setDoc(doc(postRef, 'notifications'), {
        notifications: notifications.map(item => ({
          title: item.label,
          link: item.value,
          created_at: item.created_at || new Date(),
        })),
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    setLoader(false)
  }

  async function firebaseSetup() {
    await initializeApp(firebaseConfig)
    db.current = await getFirestore()
    getPostData()
  }

  async function getPostData() {
    try {
      setLoader(true)
      const docRef = await doc(db.current, 'common', 'notifications')
      const docSnap = await getDoc(docRef)

      if (docSnap?.exists()) {
        const data = docSnap.data()
        setNotifications(
          data?.notifications?.map(item => ({
            label: item.title,
            value: item.link,
            created_at: item.created_at,
          })) || [],
        )
      } else {
        console.log('No such document!')
      }
    } catch (e) {
      console.log(e)
    }
    setLoader(false)
  }

  React.useEffect(() => {
    firebaseSetup()
    return () => { }
  }, [])

  if (loader) return <div>loading...</div>

  return (
    <div style={{ padding: 32 }}>
      <Grid container spacing={2}>
        <Grid item md={10} marginTop={2}></Grid>
        <Grid item md={1} marginTop={2}>
          <Button variant="contained" onClick={() => setPreview(true)}>
            Preview
          </Button>
        </Grid>
        <Grid item md={1} marginTop={2}>
          <Button variant="contained" onClick={dbUpdate}>
            Save
          </Button>
        </Grid>
      </Grid>
      <h1>Notifications</h1>
      <AddData
        data={notifications}
        title={'Add Latest Updates'}
        updateForm={setNotifications}
      />

      <Modal disableScrollLock open={preview} onClose={() => setPreview(false)}>
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CloseIcon
              style={{ cursor: 'pointer' }}
              onClick={() => setPreview(false)}
            />
          </div>
          <NotificationsCompnent
            list={notifications.map(item => ({
              title: item.label,
              link: item.value,
            }))}
          />
        </Box>
      </Modal>
    </div>
  )
}

export default Notifications

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1024,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
}

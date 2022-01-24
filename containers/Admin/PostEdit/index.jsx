import { Box, Button, Card, Grid, Modal } from '@mui/material'
// import type {NextPage} from 'next'
import React, { useState, useRef } from 'react'
import CommonData from './CommonData'
import AddData from './AddData'
import { postInitalState } from '../../../config/constants/postInitalState'
import AddList from './AddList'
import AddLinks from './AddLinks'
import AddCustomData from './AddCustomData'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { collection, setDoc } from 'firebase/firestore'
import { firebaseConfig } from '../../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import CloseIcon from '@mui/icons-material/Close'
import PostPreview from '../../../components/PostPreview'
import Tags from './Tags'
import NewPost from './NewPost'
import CustomTable from './CustomTable'
import AddDocument from './AddDocument'
import DraggableComponent from './Dragable'

const PostEdit = () => {
  const [form, setForm] = React.useState(null)
  const [loader, setLoader] = React.useState(false)
  let firebaseApp = React.useRef()
  let db = React.useRef()

  // const editor = useRef<any>(null)
  // const [content, setContent] = useState('')


  const [preview, setPreview] = React.useState(false)

  function updateForm(data, attr) {
    setForm(form => ({ ...form, [attr]: data }))
  }

  function updateFormCustomData(data, index) {
    console.log(data, index)
    setForm({
      ...form,
      customData: [
        ...form.customData.slice(0, index),
        {
          ...form.customData[index],
          data,
        },
        ...form.customData.slice(index + 1, form.customData.length),
      ],
    })
  }

  function onDeleteItem(index) {
    setForm({
      ...form,
      customData: [
        ...form.customData.slice(0, index),
        ...form.customData.slice(index + 1, form.customData.length),
      ],
    })
  }

  function updateLabelForCustomData(label, index) {
    setForm({
      ...form,
      customData: [
        ...form.customData.slice(0, index),
        {
          ...form.customData[index],
          label,
        },
        ...form.customData.slice(index + 1, form.customData.length),
      ],
    })
  }

  function addCustomData(type, label) {
    setForm({
      ...form,
      customData: [
        ...form.customData,
        { type, label, data: type === 'customtable' || type === 'document' ? null : [], id: new Date().getTime() },
      ],
    })
  }

  const listDiffferentEntries = [
    'important_dates',
    'application_fee',
    'age_limit',
    'qualification',
  ]

  async function dbUpdate() {
    setLoader(true)
    try {
      const postRef = collection(db.current, 'posts')

      await setDoc(
        doc(
          postRef,
          location.pathname.split('/')[location.pathname.split('/').length - 1],
        ),
        form,
      )

      // console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    setLoader(false)
  }

  async function firebaseSetup() {
    firebaseApp.current = await initializeApp(firebaseConfig)
    db.current = await getFirestore()
    getPostData()
  }

  async function getPostData() {
    try {
      const docRef = await doc(
        db.current,
        'posts',
        location.pathname.split('/')[location.pathname.split('/').length - 1],
      )
      const docSnap = await getDoc(docRef)

      if (docSnap?.exists()) {
        const data = docSnap.data()
        setForm({
          ...postInitalState,
          ...data,
        })
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    firebaseSetup()
    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!form) return null
  return (
    <div className="post-admin-edit">
      <Grid container spacing={2}>
        <Grid item md={9} marginTop={2}>
          <Tags form={form} updateForm={updateForm} />
        </Grid>
        <Grid item md={1} marginTop={2}>
          <NewPost form={form} updateForm={updateForm} />
        </Grid>
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
        {loader ? (
          'loading...'
        ) : (
          <div style={{ padding: 32, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <Card style={{ padding: 12, marginBottom: 12 }} >
                      <CommonData form={form} updateForm={updateForm} />
                    </Card>
                  </Grid>
                  <Grid item md={12}>
                    <DraggableComponent
                      form={form}
                      setForm={setForm}
                      onDeleteItem={onDeleteItem}
                      updateFormCustomData={updateFormCustomData}
                      updateLabelForCustomData={updateLabelForCustomData} />
                  </Grid>

                  {/* {listDiffferentEntries.map(entryItem => (
                    <Grid item md={6} key={entryItem}>
                      <Card style={{ padding: 12, marginBottom: 12 }} >
                        <AddData
                          data={form[entryItem]}
                          title={entryItem.split('_').join(' ').toUpperCase()}
                          updateForm={(data) => updateForm(data, entryItem)}
                        />
                        <AddList
                          data={form[entryItem + '_notes']}
                          title={'Notes'}
                          updateForm={(data) =>
                            updateForm(data, entryItem + '_notes')
                          }
                        />
                      </Card>
                    </Grid>
                  ))}
                  <Grid item md={6}>
                    <Card style={{ padding: 12, marginBottom: 12 }}>
                      <AddList
                        data={form['payment_modes']}
                        title={'Payment Modes'}
                        updateForm={(data) => updateForm(data, 'payment_modes')}
                      />
                    </Card>
                  </Grid>

                  <Grid item md={6}>
                    <Card style={{ padding: 12, marginBottom: 12 }}>
                      <AddLinks
                        data={form.important_links}
                        title={'Important Links'}
                        updateForm={(data) => updateForm(data, 'important_links')}
                      />
                    </Card>
                  </Grid>
                   */}
                  <AddCustomData addCustomData={addCustomData} />
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}

        <Modal open={preview} onClose={() => setPreview(false)}>
          <Box sx={style}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CloseIcon
                style={{ cursor: 'pointer' }}
                onClick={() => setPreview(false)}
              />
            </div>
            <PostPreview data={form} />
          </Box>
        </Modal>
      </Grid>
    </div>
  )
}

export default PostEdit

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1024,
  height: '100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'scroll',
  p: 4,
}

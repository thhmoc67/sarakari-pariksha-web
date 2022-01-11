import {Box, Button, Card, Grid, Modal} from '@mui/material'
import type {NextPage} from 'next'
import React from 'react'
import CommonData from './CommonData'
import AddData from './AddData'
import {postInitalState} from '../../../config/constants/postInitalState'
import AddList from './AddList'
import AddLinks from './AddLinks'
import AddCustomData from './AddCustomData'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {collection, setDoc} from 'firebase/firestore'
import {firebaseConfig} from '../../../config/firebase'
import {doc, getDoc} from 'firebase/firestore'
import CloseIcon from '@mui/icons-material/Close'
import PostPreview from '../../../components/PostPreview'
import Tags from './Tags'
import NewPost from './NewPost'
import CustomTable from './CustomTable'

const PostEdit: NextPage = () => {
  const [form, setForm] = React.useState<any>(null)
  const [loader, setLoader] = React.useState(false)
  let firebaseApp = React.useRef<unknown>()
  let db = React.useRef<any>()

  const [preview, setPreview] = React.useState(false)

  function updateForm(data: any, attr: string): void {
    setForm({...form, [attr]: data})
  }

  function updateFormCustomData(data: any, index: number): void {
    setForm({
      ...form,
      customData: [
        ...form.customData.slice(0, index),
        {
          type: form.customData[index].type,
          label: form.customData[index].label,
          data,
        },
        ...form.customData.slice(index + 1, form.customData.length),
      ],
    })
  }

  function addCustomData(type: string, label: string) {
    setForm({
      ...form,
      customData: [...form.customData, {type, label, data: []}],
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
    return () => {}
  }, [])

  if (!form) return null
  return (
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
        <Grid item md={12} margin={2}>
          <CommonData form={form} updateForm={updateForm} />
          {listDiffferentEntries.map(entryItem => (
            <Card style={{padding: 12, marginBottom: 12}} key={entryItem}>
              <AddData
                data={form[entryItem]}
                title={entryItem.split('_').join(' ').toUpperCase()}
                updateForm={(data: any) => updateForm(data, entryItem)}
              />
              <AddList
                data={form[entryItem + '_notes']}
                title={'Notes'}
                updateForm={(data: any) =>
                  updateForm(data, entryItem + '_notes')
                }
              />
            </Card>
          ))}
          <Card style={{padding: 12, marginBottom: 12}}>
            <AddList
              data={form['payment_modes']}
              title={'Payment Modes'}
              updateForm={(data: any) => updateForm(data, 'payment_modes')}
            />
          </Card>
          <Card style={{padding: 12, marginBottom: 12}}>
            <AddLinks
              data={form.important_links}
              title={'Important Links'}
              updateForm={(data: any) => updateForm(data, 'important_links')}
            />
          </Card>

          {form.customData.map((entryItem: any, index: number) => {
            if (entryItem.type === 'list') {
              return (
                <Card style={{padding: 12, marginBottom: 12}}>
                  <AddList
                    data={entryItem.data}
                    title={entryItem.label}
                    updateForm={(data: any) =>
                      updateFormCustomData(data, index)
                    }
                  />
                </Card>
              )
            } else if (entryItem.type === 'table') {
              return (
                <Card style={{padding: 12, marginBottom: 12}}>
                  <AddData
                    data={entryItem.data}
                    title={entryItem.label}
                    updateForm={(data: any) =>
                      updateFormCustomData(data, index)
                    }
                  />
                </Card>
              )
            } else if (entryItem.type === 'customtable') {
              return (
                <Card style={{padding: 12, marginBottom: 12}}>
                  <CustomTable
                    data={entryItem.data}
                    title={entryItem.label}
                    updateForm={(data: any) =>
                      updateFormCustomData(data, index)
                    }
                  />
                </Card>
              )
            } else return null
          })}
          <AddCustomData addCustomData={addCustomData} />
        </Grid>
      )}

      <Modal
        open={preview}
        onClose={() => setPreview(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <CloseIcon
              style={{cursor: 'pointer'}}
              onClick={() => setPreview(false)}
            />
          </div>
          <PostPreview data={form} />
        </Box>
      </Modal>
    </Grid>
  )
}

export default PostEdit

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1024,
  height: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'scroll',
  p: 4,
}

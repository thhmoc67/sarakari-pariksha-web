import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import {IconButton, Input, TextField} from '@mui/material'
import {AddCircleOutlined} from '@mui/icons-material'
import {addDoc, collection} from 'firebase/firestore'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '100vh',
  width: '100vh',
  bgcolor: 'background.paper',
  border: '1px solid #aaa',
  boxShadow: 24,
  p: 4,
}

export default function BasicModal({db, getPosts}: any) {
  const [open, setOpen] = React.useState(false)
  const [postName, setPosrName] = React.useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  async function addNewPost() {
    try {
      const docRef = await addDoc(collection(db.current, 'posts'), {
        post_name: postName,
        created_at: new Date(),
      })
      await getPosts()
      handleClose()
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <div className="admin-add-new-post">
      <Button
        color="primary"
        size="large"
        onClick={handleOpen}
        startIcon={<AddCircleOutlined />}>
        New Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Add new post
          </Typography>
          <br />
          <TextField
            fullWidth
            label="Post Name"
            color="primary"
            onChange={e => setPosrName(e.target.value)}
          />
          <br />
          <br />
          <Button fullWidth variant="contained" onClick={addNewPost}>
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

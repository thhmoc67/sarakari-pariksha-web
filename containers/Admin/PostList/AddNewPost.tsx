import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import {IconButton, Input, TextField} from '@mui/material'
import {AddCircleOutlined} from '@mui/icons-material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #aaa',
  boxShadow: 24,
  p: 4,
}

export default function BasicModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
          <TextField fullWidth label="Post Name" color="primary" />
          <br />
          <br />
          <Button fullWidth variant="contained">Add</Button>
        </Box>
      </Modal>
    </div>
  )
}

import React from 'react'
import { Box, Grid, Modal, TextField, Button } from '@mui/material'
import DataObjectIcon from '@mui/icons-material/DataObject'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100vw',
  height: '100vh',
  bgcolor: 'background.paper',
  border: '1px solid #aaa',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
}

const CommonData = ({ form, updateForm }) => {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12} marginTop={2}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Button
              onClick={() => setShowModal(true)}
              startIcon={<DataObjectIcon />}>
              Common Data
            </Button>
          </div>
        </Grid>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box sx={style}>
            <Grid container spacing={3} marginBottom={2}>
              <Grid item md={12}>
                <TextField
                  label="Post Name"
                  multiline
                  fullWidth
                  value={form.post_name}
                  onChange={e => updateForm(e.target.value, 'post_name')}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Post Date"
                  multiline
                  fullWidth
                  value={form.post_date}
                  onChange={e => updateForm(e.target.value, 'post_date')}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Desciption"
                  multiline
                  value={form.description}
                  fullWidth
                  onChange={e => updateForm(e.target.value, 'description')}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Title"
                  multiline
                  fullWidth
                  value={form.title}
                  onChange={e => updateForm(e.target.value, 'title')}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Subtitle"
                  multiline
                  fullWidth
                  value={form.subtitle}
                  onChange={e => updateForm(e.target.value, 'subtitle')}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Caption"
                  multiline
                  fullWidth
                  value={form.caption}
                  onChange={e => updateForm(e.target.value, 'caption')}
                />
              </Grid>
            </Grid>
            <Button
              variant='contained'
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Grid>
    </>
  )
}

export default CommonData

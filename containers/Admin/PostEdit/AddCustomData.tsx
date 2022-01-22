import React from 'react'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import ViewCompactIcon from '@mui/icons-material/ViewCompact'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import TableViewIcon from '@mui/icons-material/TableView'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import AddLinkIcon from '@mui/icons-material/AddLink'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type CustomItemModal = {
  handleClose?: () => void
  addCustomData: (type: string, label: string) => void
}

const AddCustomData = ({addCustomData}: CustomItemModal) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <IconButton size="large" onClick={() => handleOpen()}>
        <CreateNewFolderIcon />
      </IconButton>
      {open && (
        <CustomItemModal
          addCustomData={addCustomData}
          handleClose={handleClose}
        />
      )}
    </div>
  )
}

export default AddCustomData

const CustomItemModal = ({handleClose, addCustomData}: any) => {
  const [label, setLabel] = React.useState('')
  const [type, setType] = React.useState('')
  function submitData() {
    addCustomData(type, label)
    handleClose()
  }
  return (
    <Modal
      open={!!open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Grid container spacing={3}>
          <Grid
            item
            md={5}
            style={{
              textAlign: 'center',
              borderColor: 'black',
            }}>
            <ViewCompactIcon
              style={{
                border: type === 'table' ? '2px solid #aaa' : 0,
                borderRadius: 8,
                fontSize: 100,
                color: '#aaa',
              }}
              onClick={() => setType('table')}
            />
            <div>Table</div>
          </Grid>
          <Grid
            item
            md={5}
            style={{
              textAlign: 'center',
            }}>
            <FormatListBulletedIcon
              style={{
                borderRadius: 8,
                border: type === 'list' ? '2px solid #aaa' : 0,
                fontSize: 100,
                color: '#aaa',
              }}
              onClick={() => setType('list')}
            />
            <div>List</div>
          </Grid>
          <Grid
            item
            md={5}
            style={{
              textAlign: 'center',
            }}>
            <AddLinkIcon
              style={{
                borderRadius: 8,
                border: type === 'links' ? '2px solid #aaa' : 0,
                fontSize: 100,
                color: '#aaa',
              }}
              onClick={() => setType('links')}
            />
            <div>Links</div>
          </Grid>
          <Grid
            item
            md={5}
            style={{
              textAlign: 'center',
            }}>
            <TableViewIcon
              style={{
                borderRadius: 8,
                border: type === 'customtable' ? '2px solid #aaa' : 0,
                fontSize: 100,
                color: '#aaa',
              }}
              onClick={() => setType('customtable')}
            />
            <div>Custom Table</div>
          </Grid>
          <Grid
            item
            md={5}
            style={{
              textAlign: 'center',
            }}>
            <ArticleOutlinedIcon
              style={{
                borderRadius: 8,
                border: type === 'document' ? '2px solid #aaa' : 0,
                fontSize: 100,
                color: '#aaa',
              }}
              onClick={() => setType('document')}
            />
            <div>Document</div>
          </Grid>
          {type && (
            <Grid item md={12}>
              <TextField
                size="small"
                label="Name"
                fullWidth
                onChange={e => setLabel(e.target.value)}
              />
            </Grid>
          )}
          <Grid item md={12}>
            <Button onClick={handleClose}>Cancel</Button>
            {label && (
              <Button variant="contained" onClick={submitData}>
                Submit
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

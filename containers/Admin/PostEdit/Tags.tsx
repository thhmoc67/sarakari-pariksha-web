import React from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import {tagsList} from '../../../config/constants/tags'
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Modal,
  Snackbar,
  Alert,
} from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100vw',
  height: '100vh',
  bgcolor: 'background.paper',
  border: '1px solid #aaa',
  boxShadow: 24,
  p: 4,
}

function Tags({form, updateForm}: any) {
  const [openModal, setOpenModal] = React.useState(false)
  console.log(form)

  return (
    <div style={{paddingLeft: 16}}>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Tags
      </Button>
      {openModal && (
        <TagModal
          form={form}
          open={openModal}
          handleClose={() => setOpenModal(false)}
          updateForm={updateForm}
        />
      )}
    </div>
  )
}

const TagModal = ({form, handleClose, open, updateForm}: any) => {
  const [tags, setTagsList] = React.useState(form.tags || [])
  const [count, setCount] = React.useState(0)
  const [tagDates, setTagDates] = React.useState<any>(form.tagDates || {})
  const [openSnackbar, setOpenSnackbar] = React.useState(false)

  function handleDelete(tag: any) {
    const index = tags.indexOf(tag)
    const list = tags
    list.splice(index, 1)
    setTagsList(list)
  }

  function handleAdd(tag: any) {
    let tagsList = tags
    tagsList.push(tag)
    setTagsList(tagsList)
  }

  function handleClick(tag: any) {
    if (tags) {
      if (tags.includes(tag)) {
        handleDelete(tag)
      } else {
        handleAdd(tag)
      }
    } else {
      setTagsList([tag])
    }
    setCount(count + 1)
  }

  function validateDates() {
    return tags.map((tag: any) => !!tagDates[tag]).includes(false)
  }

  function handleSave() {
    if (!validateDates()) {
      setTimeout(() => {
        updateForm(tags, 'tags')
      }, 130)
      setTimeout(() => {
        console.log(tagDates)
        updateForm(tagDates, 'tagDates')
      }, 50)
      handleClose()
    } else {
      setOpenSnackbar(true)
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div>
          <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={() => setOpenSnackbar(false)}
            // action={action}
          >
            <Alert severity="error">
              Please updates dates for selected tags
            </Alert>
          </Snackbar>
          {tagsList.map(tag => {
            return (
              <div key={tag}>
                <Grid container>
                  <Grid item md={2}>
                    <span>
                      <Checkbox
                        value={tag}
                        onChange={(e: any) => handleClick(e.target?.value)}
                        checked={tags.includes(tag)}
                        color="success"
                      />
                      <span>{tag}</span>
                    </span>
                  </Grid>
                  <Grid item md={4}>
                    <input
                      type="date"
                      value={tagDates[tag] || ''}
                      onChange={e =>
                        setTagDates((dates: any) => ({
                          ...dates,
                          [tag]: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            )
          })}
        </div>

        <div style={{marginTop: 50}}>
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{marginRight: 12}}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default Tags

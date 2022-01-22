import React from 'react'
import {Button, Card, Grid, IconButton, Input, TextField} from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/AddToPhotos'
import TableChartIcon from '@mui/icons-material/TableChart'

type AddData = {
  data: Data[]
  title: string
  updateForm: (data: []) => void
}

type Data = {
  label: string
  value: string
  note: string
}

const AddData = ({
  data,
  title,
  updateForm,
  editableLabel,
  updateLabelForCustomData,
  onDeleteItem,
}: any) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  function updateData(data: any) {
    updateForm(data)
    handleClose()
  }
  return (
    <Grid container spacing={3}>
      <Grid item md={12} marginTop={2}>
        <Button onClick={handleOpen} startIcon={<TableChartIcon />}>
          {title}
        </Button>
        {/* {data?.map((item, index: number) => (
          <Grid container key={title + ' card' + index}>
            <Grid md={6} padding={1}>
              <Typography>{item.label}</Typography>
            </Grid>
            <Grid md={6} padding={1}>
              <Typography>
                {item.value}{' '}
                <span style={{color: 'red'}}>
                  {!!item.note && `${item.note}`}
                </span>
              </Typography>
            </Grid>
          </Grid>
        ))} */}
      </Grid>

      {/* modal */}
      {open && (
        <InputModal
          editableLabel={editableLabel}
          updateLabelForCustomData={updateLabelForCustomData}
          open={open}
          handleClose={handleClose}
          data={data}
          title={title}
          updateData={updateData}
          onDeleteItem={onDeleteItem}
        />
      )}
    </Grid>
  )
}

export default AddData

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
  overflow: 'scroll',
}

// -----------------------------------------------------component input array-------------------------------------------------------------------------------------------------
type InputModal = {
  open: boolean
  handleClose: () => void
  data: Data[]
  title: string
  updateData: (form: Data[]) => void
}

const InputModal = ({
  open,
  handleClose,
  data,
  title,
  updateData,
  updateLabelForCustomData,
  editableLabel,
  onDeleteItem,
}: any) => {
  const [formData, setFormData] = React.useState<[] | Data[]>([])

  function addInfo() {
    setFormData([
      ...formData,
      {
        label: '',
        value: '',
        note: '',
      },
    ])
  }

  function removeInfo(index: number) {
    setFormData([
      ...formData.slice(0, index),
      ...formData.slice(index + 1, formData.length),
    ])
  }

  function handleChangeInput(attr: string, value: any, index: number) {
    let data: any = formData
    data[index][attr] = value
    setFormData(data)
  }

  React.useEffect(() => {
    setFormData(data)
  }, [])
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        {editableLabel ? (
          <Input
            fullWidth
            value={title}
            onChange={e => updateLabelForCustomData(e.target.value)}
          />
        ) : (
          <Typography variant="h5" component="h1" marginBottom={2}>
            {title}
          </Typography>
        )}
        <br />
        <br />

        {formData?.map((inputItem, index: number) => (
          <Grid container spacing={3} marginBottom={1} key={title + index}>
            <Grid item md={4}>
              <TextField
                size="small"
                label="Label"
                multiline
                fullWidth
                defaultValue={inputItem.label}
                onChange={e =>
                  handleChangeInput('label', e.target.value, index)
                }
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                size="small"
                label="Value"
                multiline
                fullWidth
                defaultValue={inputItem.value}
                onChange={e =>
                  handleChangeInput('value', e.target.value, index)
                }
              />
            </Grid>
            <Grid item md={3}>
              <TextField
                size="small"
                label="Notes"
                multiline
                fullWidth
                defaultValue={inputItem.note}
                onChange={e => handleChangeInput('note', e.target.value, index)}
              />
            </Grid>
            <Grid item md={1}>
              <IconButton size="small" onClick={() => removeInfo(index)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid item md={12} margin={3}>
          <IconButton size="small" onClick={addInfo}>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={11}>
            <Button
              onClick={e => handleClose()}
              variant={'outlined'}
              style={{marginRight: 12}}>
              Cancel
            </Button>

            <Button
              style={{marginRight: 12}}
              onClick={() => updateData(formData)}
              variant="contained">
              Submit
            </Button>
          </Grid>
          <Grid item md={1}>
            <Button
              onClick={onDeleteItem}
              color={'warning'}
              variant="contained">
              Remove
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

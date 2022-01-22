import React from 'react'
import {Button, Card, Grid, IconButton, TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

const AddList = ({data, title, updateForm}: any) => {
  const [openList, setOpenList] = React.useState(false)
  const handleOpenList = () => setOpenList(true)
  const handleCloseList = () => setOpenList(false)

  function updateData(data: any) {
    updateForm(data)
    handleCloseList()
  }
  return (
    <Grid container spacing={3}>
      <Grid item md={12} marginTop={2}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Button
            onClick={handleOpenList}
            startIcon={<FormatListBulletedIcon />}>
            {title}
          </Button>
        </div>
        {/* {data?.map((item: any, index: number) => (
          <Grid container key={title + ' card' + index}>
            <Grid md={12} padding={1}>
              <Typography>{item}</Typography>
            </Grid>
          </Grid>
        ))} */}
      </Grid>

      {openList && (
        <ListModal
          open={openList}
          handleClose={handleCloseList}
          data={data}
          title={title}
          updateData={updateData}
        />
      )}
    </Grid>
  )
}

export default AddList

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

// -----------------------------------------------------component list-------------------------------------------------------------------------------------------------

const ListModal = ({open, handleClose, data, title, updateData}: any) => {
  const [listData, setListData] = React.useState<any>([])

  function addInfo() {
    setListData([...listData, ''])
  }

  function removeInfo(index: number) {
    setListData([
      ...listData.slice(0, index),
      ...listData.slice(index + 1, listData.length),
    ])
  }

  function handleChangeInput(value: any, index: number) {
    let data = listData
    data[index] = value
    setListData(data)
  }

  React.useEffect(() => {
    setListData(data)
  }, [])
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h5" component="h1" marginBottom={2}>
          {title}
        </Typography>

        {listData?.map((listItem: any, index: number) => (
          <Grid
            container
            spacing={3}
            marginBottom={1}
            key={title + ' list item' + index}>
            <Grid item md={11}>
              <TextField
                size="small"
                label="List item"
                multiline
                fullWidth
                defaultValue={listItem}
                onChange={e => handleChangeInput(e.target.value, index)}
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
            <PlaylistAddIcon />
          </IconButton>
        </Grid>
        <>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{marginRight: 12}}>
            Cancel
          </Button>

          <Button onClick={() => updateData(listData)} variant="contained">
            Submit
          </Button>
        </>
      </Box>
    </Modal>
  )
}

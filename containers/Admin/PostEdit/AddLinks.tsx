import React from 'react'
import {Button, Grid, IconButton, Input, TextField} from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import AddLinkIcon from '@mui/icons-material/AddLink'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import {Link, PostList} from '../../../components/PostPreview'

type AddLinks = {
  data: PostList[]
  title: string
  updateForm: (data: PostList) => void
}

const AddLinks = ({
  data,
  title,
  updateForm,
  editableLabel,
  updateLabelForCustomData,
  onDeleteItem,
}: any) => {
  const [openList, setOpenList] = React.useState(false)
  const handleOpenList = () => setOpenList(true)
  const handleCloseList = () => setOpenList(false)

  function updateData(data: PostList) {
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
          <Button onClick={handleOpenList} startIcon={<InsertLinkIcon />}>
            {title}
          </Button>
        </div>
      </Grid>

      {openList && (
        <ListModal
          editableLabel={editableLabel}
          updateLabelForCustomData={updateLabelForCustomData}
          open={openList}
          handleClose={handleCloseList}
          data={data}
          title={title}
          updateData={updateData}
          onDeleteItem={onDeleteItem}
        />
      )}
    </Grid>
  )
}

export default AddLinks

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

// -----------------------------------------------------component list-------------------------------------------------------------------------------------------------
type ListModal = {
  open: boolean
  handleClose: () => void
  data: any
  title: string
  updateData: (data: PostList) => void
}

const ListModal = ({
  open,
  handleClose,
  data,
  title,
  updateData,
  updateLabelForCustomData,
  editableLabel,
  onDeleteItem,
}: any) => {
  const [listData, setListData] = React.useState<any>([])
  const [count, setCount] = React.useState(0)

  function addInfo() {
    setListData([
      ...listData,
      {
        label: '',
        links: [{label: '', url: ''}],
      },
    ])
  }

  function addLink(index: number) {
    var newData = listData
    var newCount = count + 1
    newData[index].links.push({label: '', url: ''})
    setListData(newData)
    setCount(newCount)
  }

  function removeLink(index: number, linkIndex: number) {
    var newData = listData
    var newCount = count + 1
    newData[index].links = [
      ...newData[index].links.slice(0, linkIndex),
      ...newData[index].links.slice(linkIndex + 1, newData[index].links.length),
    ]
    setListData(newData)
    setCount(newCount)
  }

  function removeInfo(index: number) {
    setListData([
      ...listData.slice(0, index),
      ...listData.slice(index + 1, listData.length),
    ])
  }

  function handleChangeLink(
    attr: string,
    value: any,
    index: number,
    linkIndex: number,
  ) {
    let newdata = listData
    newdata[index].links[linkIndex][attr] = value
    setListData(newdata)
  }

  function handleChangeInput(attr: string, value: any, index: number) {
    let newdata = listData
    newdata[index][attr] = value
    setListData(newdata)
  }

  React.useEffect(() => {
    setListData(data)
  }, [])

  return (
    <Modal open={open} onClose={handleClose}>
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

        <Grid container spacing={1}>
          {listData?.map((listItem: any, index: number) => (
            <Grid item md={6} key={title + ' list item' + index} padding={1}>
              <Grid
                style={{
                  padding: 8,
                  backgroundColor: '#fafafa',
                  margin: 8,
                  border: '1px solid #bbb',
                }}
                container
                spacing={1}>
                <Grid item md={11}>
                  <TextField
                    size="small"
                    label="Label"
                    fullWidth
                    defaultValue={listItem.label}
                    onChange={e =>
                      handleChangeInput('label', e.target.value, index)
                    }
                  />
                </Grid>
                <Grid item md={1}>
                  <IconButton size="small" onClick={() => removeInfo(index)}>
                    <CloseIcon color={'error'} />
                  </IconButton>
                </Grid>
                {listItem?.links?.map((link: Link, linkIndex: number) => (
                  <React.Fragment key={'listindex' + linkIndex}>
                    <Grid item md={5}>
                      <TextField
                        size="small"
                        label="Text"
                        fullWidth
                        defaultValue={link.label}
                        onChange={e =>
                          handleChangeLink(
                            'label',
                            e.target.value,
                            index,
                            linkIndex,
                          )
                        }
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        size="small"
                        label="Link"
                        fullWidth
                        defaultValue={link.url}
                        onChange={e =>
                          handleChangeLink(
                            'url',
                            e.target.value,
                            index,
                            linkIndex,
                          )
                        }
                      />
                    </Grid>
                    <Grid item md={1}>
                      {listItem.links.length - 1 === linkIndex ? (
                        <IconButton size="small" onClick={() => addLink(index)}>
                          <AddLinkIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          onClick={() => removeLink(index, linkIndex)}>
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item md={12} margin={3}>
          <IconButton size="small" onClick={addInfo}>
            <AddLinkIcon />
          </IconButton>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={11}>
            <Button
              onClick={e => handleClose()}
              variant={'outlined'}
              style={{ marginRight: 12 }}>
              Cancel
            </Button>

            <Button
              style={{ marginRight: 12 }}
              onClick={() => updateData(listData)}
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

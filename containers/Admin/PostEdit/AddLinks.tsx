import React from 'react'
import {Button, Card, Grid, IconButton, TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CloseIcon from '@mui/icons-material/Close'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import AddLinkIcon from '@mui/icons-material/AddLink'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

const AddLinks = ({data, title, updateForm}) => {
  const [openList, setOpenList] = React.useState(false)
  const handleOpenList = () => setOpenList(true)
  const handleCloseList = () => setOpenList(false)

  function updateData(data) {
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
        {data?.map((item, index: number) => (
          <Grid container key={title + ' card' + index}>
            <Grid md={6} padding={1}>
              <Typography>{item.label}</Typography>
            </Grid>
            <Grid md={6} padding={1}>
              {item?.links?.map((link, index) => (
                <React.Fragment key={'urlimplink' + index}>
                  <u>
                    <a
                      style={{color: 'blue'}}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer">
                      {link.label}{' '}
                    </a>
                  </u>
                  {item.links.length - 1 !== index && (
                    <>&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;</>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        ))}
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

const ListModal = ({open, handleClose, data, title, updateData}) => {
  const [listData, setListData] = React.useState([])
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

  function removeLink(index: number, linkIndex) {
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h5" component="h1" marginBottom={2}>
          {title}
        </Typography>
        <Grid container spacing={1}>
          {listData?.map((listItem, index: number) => (
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
                {listItem?.links?.map((link, linkIndex: number) => (
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

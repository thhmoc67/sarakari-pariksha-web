import {Box, Button, Grid, IconButton, Modal, Typography} from '@mui/material'
import React, {useState} from 'react'
import TableViewIcon from '@mui/icons-material/TableView'
import CustomTablePreview from '../../../components/CustomTablePreview'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/AddToPhotos'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteIcon from '@mui/icons-material/Delete'

const CustomTable = ({title, data}) => {
  const [openModal, setOpenModal] = useState(false)
  function handleOpen() {
    setOpenModal(true)
  }

  function handleClose() {
    setOpenModal(false)
  }
  return (
    <Grid container spacing={3}>
      <Grid item md={12} marginTop={2}>
        <Button onClick={handleOpen} startIcon={<TableViewIcon />}>
          {title}
        </Button>
        <CustomTablePreview />
        <TableModal open={openModal} handleClose={handleClose} />
      </Grid>
    </Grid>
  )
}

export default CustomTable

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1024,
  bgcolor: 'background.paper',
  border: '1px solid #aaa',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
}

const TableModal = ({open = false, title = '', handleClose}) => {
  const [data, setData] = useState([])
  const [rowVal, setRow] = useState(0)

  function closeModal() {
    handleClose()
    setData([])
  }

  function addInfo() {
    setData([[{text: '', rowSpan: 1, colSpan: 1}]])
  }

  function updateData() {}

  function handleOnChange(col, row, value, attr) {
    console.log(col, row, value, attr)
    if ((attr === 'rowSpan' || attr === 'colSpan') && value < 1) {
      setRow(rowVal + 1)
      return
    }
    let newData = data
    newData[col][row][attr] = value
    setData(newData)
    setRow(rowVal + 1)
  }

  function addColumn() {
    let newData = data
    newData = [...data, [{id: 3, text: '', rowSpan: 1, colSpan: 1}]]
    setData(newData)
    setRow(rowVal + 1)
  }

  function addRow(col) {
    let newData = data
    newData[col] = [...newData[col], {text: '', rowSpan: 1, colSpan: 1}]
    setData(newData)
    setRow(rowVal + 1)
  }

  function removeItem(col, row) {
    let newData = data
    if (newData[col].length === 1) {
      newData = [...newData.slice(0, col), ...newData.slice(col + 1)]
    } else {
      newData[col] = [
        ...newData[col].slice(0, row),
        ...newData[col].slice(row + 1),
      ]
    }

    setData(newData)
    setRow(rowVal + 1)
  }

  let maxCol = 0
  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={style}>
        <Typography variant="h5" component="h1" marginBottom={2}>
          {title}
        </Typography>

        {!data.length && (
          <Grid item md={12} margin={3}>
            <IconButton size="small" onClick={addInfo}>
              <AddIcon />
            </IconButton>
          </Grid>
        )}

        <Grid container spacing={3} marginBottom={1}>
          <Grid item md={12}>
            <div className="table">
              <table style={{width: '100%'}}>
                {data.map((colItem, i) => {
                  const ItemDetail = ({item, j}) => {
                    const disabledArrowLeft = item.colSpan === 1
                    const disabledArrowRight =
                      maxCol + 1 === colItem.length + item.colSpan - 1
                    const disabledArrowDropDown =
                      item.rowSpan === data.length - i
                    const disabledArrowDropUp = item.rowSpan === 1
                    return (
                      <div className="table-element">
                        <textarea
                          placeholder='enter something'
                          defaultValue={item.text}
                          onChange={e =>
                            handleOnChange(i, j, e.target.value, 'text')
                          }
                        />
                        <div className="btn-list">
                          <span
                            onClick={() =>
                              !disabledArrowLeft &&
                              handleOnChange(i, j, item.colSpan - 1, 'colSpan')
                            }
                            style={{
                              color: disabledArrowLeft ? '#eee' : 'grey',
                              cursor: 'pointer',
                            }}>
                            <ArrowLeftIcon />
                          </span>
                          <span
                            onClick={() =>
                              !disabledArrowRight &&
                              handleOnChange(i, j, item.colSpan + 1, 'colSpan')
                            }
                            style={{
                              color: disabledArrowRight ? '#eee' : 'grey',
                              cursor: 'pointer',
                            }}>
                            <ArrowRightIcon />
                          </span>
                          <span
                            onClick={() =>
                              !disabledArrowDropDown &&
                              handleOnChange(i, j, item.rowSpan + 1, 'rowSpan')
                            }
                            style={{
                              color: disabledArrowDropDown ? '#eee' : 'grey',
                              cursor: 'pointer',
                            }}>
                            <ArrowDropDownIcon />
                          </span>
                          <span
                            onClick={() =>
                              !disabledArrowDropUp &&
                              handleOnChange(i, j, item.rowSpan - 1, 'rowSpan')
                            }
                            style={{
                              color: disabledArrowDropUp ? '#eee' : 'grey',
                              cursor: 'pointer',
                            }}>
                            <ArrowDropUpIcon />
                          </span>
                          <span
                            onClick={() => removeItem(i, j)}
                            style={{color: 'grey', cursor: 'pointer'}}>
                            <DeleteIcon style={{fontSize: 12}} />
                          </span>
                        </div>
                        {/* {0 === j && (
                      <span
                        onClick={() => removeItem(i, j)}
                        style={{
                          position: 'absolute',
                          left: -15,
                          color: 'grey',
                          cursor: 'pointer',
                        }}>
                        -
                      </span>
                    )} */}

                        {colItem.length - 1 === j && (
                          <span
                            onClick={() => addRow(i)}
                            style={{
                              position: 'absolute',
                              right: -15,
                              color: 'red',
                              cursor: 'pointer',
                            }}>
                            +
                          </span>
                        )}
                      </div>
                    )
                  }
                  if (i === 0) {
                    return (
                      <tr>
                        {colItem.map((item, j) => {
                          if (maxCol < j) maxCol = j
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <th rowSpan={item.rowSpan} colSpan={item.colSpan}>
                              <ItemDetail item={item} j={j} />

                              {0 === i && 0 === j && (
                                <span
                                  onClick={() => addColumn()}
                                  style={{
                                    position: 'absolute',
                                    left: 50,
                                    bottom: 85,
                                    color: 'red',
                                    cursor: 'pointer',
                                  }}>
                                  +
                                </span>
                              )}
                            </th>
                          )
                        })}
                      </tr>
                    )
                  }
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                      {colItem.map((item, j) => {
                        if (maxCol < j) maxCol = j
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <>
                            <td rowSpan={item.rowSpan} colSpan={item.colSpan}>
                              <ItemDetail item={item} j={j} />
                            </td>
                          </>
                        )
                      })}
                    </tr>
                  )
                })}
              </table>
            </div>
          </Grid>
        </Grid>
        <br />
        <br />
        <>
          <Button
            onClick={closeModal}
            variant={'outlined'}
            style={{marginRight: 12}}>
            Cancel
          </Button>

          <Button onClick={() => updateData(formData)} variant="contained">
            Submit
          </Button>
        </>
      </Box>
    </Modal>
  )
}

import React from 'react'
import dynamic from 'next/dynamic'
import { Box, Button, Grid, Modal } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'

const importJodit = () => import('jodit-react')

const JoditEditor = dynamic(importJodit, {
  ssr: false,
})


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


const AddDocument = ({ data, title, updateForm }) => {
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
          <Button
            onClick={handleOpenList}
            startIcon={<ArticleOutlinedIcon />}>
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
        <DocumentModal
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

export default AddDocument

const config = {
  innerWidth: '100%',
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
}

const DocumentModal = ({ data, handleClose, updateData }) => {
  const [content, setContent] = React.useState(data || '')
  return (
    <Modal
      open={!!open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <JoditEditor
          // ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={setContent} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => { }}
        />

        <>
          <br />
          <br />
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ marginRight: 12 }}>
            Cancel
          </Button>

          <Button onClick={() => updateData(content)} variant="contained">
            Submit
          </Button>
        </>
      </Box>
    </Modal>
  )

}


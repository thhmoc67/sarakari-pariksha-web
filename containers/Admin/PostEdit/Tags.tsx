import React from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import {tagsList} from '../../../config/constants/tags'

function Tags({form, updateForm}: any) {
  function handleDelete(tag: any) {
    if (form.tags) {
      const index = form.tags.indexOf(tag)
      const list = form.tags
      list.splice(index, 1)
      // console.log(form.tags.splice(index, 1))
      updateForm(list, 'tags')
    } else {
      return
    }
  }

  function handleClick(tag: any) {
    console.log(tag)
    if (form.tags) {
      let tagsList = form.tags
      tagsList.push(tag)
      updateForm(tagsList, 'tags')
    } else {
      updateForm([tag], 'tags')
    }
  }

  return (
    <div style={{paddingLeft: 16}}>
      <Stack direction="row" spacing={1}>
        {tagsList.map(tag => {
          return (
            <Chip
              color="primary"
              key={tag}
              label={tag}
              variant={
                form?.tags?.length && form?.tags?.includes(tag)
                  ? 'filled'
                  : 'outlined'
              }
              onDelete={
                !!form?.tags?.length && !!form?.tags?.includes(tag)
                  ? () => handleDelete(tag)
                  : undefined
              }
              onClick={
                !!form?.tags?.length && !!form?.tags?.includes(tag)
                  ? undefined
                  : () => handleClick(tag)
              }
            />
          )
        })}

        {/* <Chip label="Chip Outlined" variant="outlined" /> */}
      </Stack>
    </div>
  )
}

export default Tags

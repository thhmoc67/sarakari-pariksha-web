import React from 'react'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import {tagsList} from '../../../config/constants/tags'

function NewPost({form, updateForm}: any) {
  function handleDelete() {
    updateForm(false, 'isNew')
  }

  function handleClick() {
    updateForm(true, 'isNew')
  }

  return (
    <div style={{paddingLeft: 16}}>
      <Stack direction="row" spacing={1}>
        <Chip
          color="primary"
          label={'New'}
          variant={form?.isNew ? 'filled' : 'outlined'}
          onDelete={!!form?.isNew ? () => handleDelete() : undefined}
          onClick={!!form?.isNew ? undefined : () => handleClick()}
        />
      </Stack>
    </div>
  )
}

export default NewPost

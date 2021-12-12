import React from 'react'
import {Grid, TextField} from '@mui/material'

const CommonData = ({form, updateForm}) => {
  console.log('form.post_name', form, form.post_name)
  return (
    <Grid container spacing={3} marginBottom={2}>
      <Grid item md={4}>
        <TextField
          label="Post Name"
          multiline
          fullWidth
          value={form.post_name}
          onChange={e => updateForm(e.target.value, 'post_name')}
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          label="Post Date"
          multiline
          fullWidth
          value={form.post_date}
          onChange={e =>
            updateForm(e.target.value, 'post_date')
          }
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          label="Desciption"
          multiline
          value={form.description}
          fullWidth
          onChange={e =>
            updateForm(e.target.value, 'description')
          }
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          label="Title"
          multiline
          fullWidth
          value={form.title}
          onChange={e => updateForm(e.target.value, 'title')}
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          label="Subtitle"
          multiline
          fullWidth
          value={form.subtitle}
          onChange={e => updateForm(e.target.value, 'subtitle')}
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          label="Caption"
          multiline
          fullWidth
          value={form.caption}
          onChange={e => updateForm(e.target.value, 'caption')}
        />
      </Grid>
    </Grid>
  )
}

export default CommonData

import React from 'react'
import {Grid, TextField} from '@mui/material'

const CommonData = () => {
  return (
    <Grid container spacing={3} marginBottom={2}>
      <Grid item md={4}>
        <TextField label="Post Name" multiline fullWidth />
      </Grid>
      <Grid item md={4}>
        <TextField label="Post Date" multiline fullWidth />
      </Grid>
      <Grid item md={4}>
        <TextField label="Desciption" multiline fullWidth />
      </Grid>
      <Grid item md={4}>
        <TextField label="Title" multiline fullWidth />
      </Grid>
      <Grid item md={4}>
        <TextField label="Subtitle" multiline fullWidth />
      </Grid>
      <Grid item md={4}>
        <TextField label="Caption" multiline fullWidth />
      </Grid>
    </Grid>
  )
}

export default CommonData

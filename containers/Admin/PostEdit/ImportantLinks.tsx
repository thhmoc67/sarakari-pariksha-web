import React from 'react'
import {Grid, TextField} from '@mui/material'

const ImportantLinks = () => {
  return (
    <Grid container spacing={3}>
      <Grid item md={4}>
        <TextField label="Label" multiline rows={2} fullWidth />
      </Grid>
      <Grid item md={4}>
        <TextField label="Value" multiline rows={2} fullWidth />
      </Grid>
    </Grid>
  )
}

export default ImportantLinks

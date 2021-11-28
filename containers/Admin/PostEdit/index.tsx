import {Card, Grid} from '@mui/material'
import type {NextPage} from 'next'
import React from 'react'
import CommonData from './CommonData'
import AddData from './AddData'
import {postInitalState} from '../../../config/constants/postInitalState'
import AddList from './AddList'

const PostEdit: NextPage = () => {
  const [form, setForm] = React.useState(postInitalState)

  function updateForm(data: any, attr: string): void {
    setForm({...form, [attr]: data})
  }
  return (
    <Grid container spacing={2}>
      <Grid item md={12} margin={2}>
        <CommonData />
        <Card style={{padding: 12}}>
          <AddData
            data={form.application_fee}
            title={'Application Fee'}
            updateForm={(data: any) => updateForm(data, 'application_fee')}
          />
          <AddList
            data={form.application_fee}
            title={'Notes'}
            updateForm={(data: any) => updateForm(data, 'application_fee')}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default PostEdit

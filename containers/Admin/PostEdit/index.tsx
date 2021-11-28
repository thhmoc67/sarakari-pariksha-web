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

  const listDiffferentEntries = [
    'important_dates',
    'application_fee',
    'age_limit',
    'qualification',
  ]
  return (
    <Grid container spacing={2}>
      <Grid item md={12} margin={2}>
        <CommonData />
        {listDiffferentEntries.map(entryItem => (
          <Card style={{padding: 12, marginBottom: 12}} key={entryItem}>
            <AddData
              data={form[entryItem]}
              title={entryItem.split('_').join(' ').toUpperCase()}
              updateForm={(data: any) => updateForm(data, entryItem)}
            />
            <AddList
              data={form[entryItem + '_notes']}
              title={'Notes'}
              updateForm={(data: any) => updateForm(data, entryItem + '_notes')}
            />
          </Card>
        ))}
        <Card style={{padding: 12, marginBottom: 12}}>
          <AddList
            data={form['payment_modes']}
            title={'Payment Modes'}
            updateForm={(data: any) => updateForm(data, 'payment_modes')}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default PostEdit

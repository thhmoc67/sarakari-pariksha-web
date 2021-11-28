import {Card, Grid} from '@mui/material'
import type {NextPage} from 'next'
import React from 'react'
import CommonData from './CommonData'
import AddData from './AddData'
import {postInitalState} from '../../../config/constants/postInitalState'
import AddList from './AddList'
import AddLinks from './AddLinks'
import AddCustomData from './AddCustomData'

const PostEdit: NextPage = () => {
  const [form, setForm] = React.useState(postInitalState)

  function updateForm(data: any, attr: string): void {
    setForm({...form, [attr]: data})
  }

  function updateFormCustomData(data: any, index: number): void {
    setForm({
      ...form,
      customData: [
        ...form.customData.slice(0, index),
        {
          type: form.customData[index].type,
          label: form.customData[index].label,
          data,
        },
        ...form.customData.slice(index + 1, form.customData.length),
      ],
    })
  }

  function addCustomData(type: string, label: string) {
    setForm({
      ...form,
      customData: [...form.customData, {type, label, data: []}],
    })
  }

  const listDiffferentEntries = [
    'important_dates',
    'application_fee',
    'age_limit',
    'qualification',
  ]

  console.log('---', form.customData)
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
        <Card style={{padding: 12, marginBottom: 12}}>
          <AddLinks
            data={form.important_links}
            title={'Important Links'}
            updateForm={(data: any) => updateForm(data, 'important_links')}
          />
        </Card>

        {form.customData.map((entryItem, index) => {
          if (entryItem.type === 'list') {
            return (
              <Card style={{padding: 12, marginBottom: 12}}>
                <AddList
                  data={entryItem.data}
                  title={entryItem.label}
                  updateForm={(data: any) => updateFormCustomData(data, index)}
                />
              </Card>
            )
          } else if (entryItem.type === 'table') {
            return (
              <Card style={{padding: 12, marginBottom: 12}}>
                <AddData
                  data={entryItem.data}
                  title={entryItem.label}
                  updateForm={(data: any) => updateFormCustomData(data, index)}
                />
              </Card>
            )
          } else return null
        })}
        <AddCustomData addCustomData={addCustomData} />
      </Grid>
    </Grid>
  )
}

export default PostEdit

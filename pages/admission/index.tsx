import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import {fetchPostResults} from '../../utils/api'
import PostTitleListCard from '../../components/PostTitleListCard'

interface Props {
  results?: any
}

const AdmissionPage: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksha | Admissions</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Admission</h1>
        <PostTitleListCard results={props?.results} />
      </Layout>
    </>
  )
}

AdmissionPage.getInitialProps = async ({req}: any) => {
  const results = await fetchPostResults('admission')
  return {results}
}

export default AdmissionPage

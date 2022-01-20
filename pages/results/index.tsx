import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import {fetchPostResults} from '../../utils/api'
import PostTitleListCard from '../../components/PostTitleListCard'

interface Props {
  results?: any
}

const Results: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksha | Results</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Results</h1>
        <PostTitleListCard results={props?.results} />
      </Layout>
    </>
  )
}

Results.getInitialProps = async ({req}: any) => {
  const results = await fetchPostResults('results')
  return {results}
}

export default Results

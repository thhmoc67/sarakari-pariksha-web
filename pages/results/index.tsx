import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PostsList from '../../components/PostsList'

interface Props {}

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
        <PostsList tag="results" />
      </Layout>
    </>
  )
}

Results.getInitialProps = async ({req}: any) => {
  return {}
}

export default Results

import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PostsList from '../../components/PostsList'
interface Props {}

const LatestJobs: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksha | Pariskha Results</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Latest Jobs</h1>
        <PostsList tag="latest jobs" />
      </Layout>
    </>
  )
}

LatestJobs.getInitialProps = async ({req}: any) => {
  return {}
}

export default LatestJobs

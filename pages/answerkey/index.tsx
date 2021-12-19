import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PostsList from '../../components/PostsList'

interface Props {}

const AnswerkeyPage: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksha | Answer key</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Answer Key</h1>
        <PostsList tag="answer key" />
      </Layout>
    </>
  )
}

AnswerkeyPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default AnswerkeyPage

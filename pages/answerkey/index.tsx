import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import {fetchPostResults} from '../../utils/api'
import PostTitleListCard from '../../components/PostTitleListCard'

interface Props {
  results?: any
}

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
        <PostTitleListCard results={props?.results} />
      </Layout>
    </>
  )
}

AnswerkeyPage.getInitialProps = async ({req}: any) => {
  const results = await fetchPostResults('answer key')
  return {results}
}

export default AnswerkeyPage

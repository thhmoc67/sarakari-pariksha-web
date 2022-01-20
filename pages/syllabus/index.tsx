import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import {fetchPostResults} from '../../utils/api'
import PostTitleListCard from '../../components/PostTitleListCard'

interface Props {
  results?: any
}

const SyllabusPage: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksha | Syllabus</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Syllabus</h1>
        <PostTitleListCard results={props?.results} />
      </Layout>
    </>
  )
}

SyllabusPage.getInitialProps = async ({req}: any) => {
  const results = await fetchPostResults('syllabus')
  return {results}
}

export default SyllabusPage

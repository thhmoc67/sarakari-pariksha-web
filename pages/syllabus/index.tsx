import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PostsList from '../../components/PostsList'

interface Props {}

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
        <PostsList tag="syllabus" />
      </Layout>
    </>
  )
}

SyllabusPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default SyllabusPage

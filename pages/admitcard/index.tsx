import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PostsList from '../../components/PostsList'

interface Props {}

const AdmitCardPage: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksha | Answer key</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Admit Card</h1>
        <PostsList tag="admit card" />
      </Layout>
    </>
  )
}

AdmitCardPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default AdmitCardPage

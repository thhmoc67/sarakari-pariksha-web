import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PostsList from '../../components/PostsList'

interface Props {}

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
        <PostsList tag="admission" />
      </Layout>
    </>
  )
}

AdmissionPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default AdmissionPage

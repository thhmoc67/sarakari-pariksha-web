import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'

interface Props {}

const AnswerKeyPage: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksa</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <p>AnswerKeyPage</p>
      </Layout>
    </>
  )
}

AnswerKeyPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default AnswerKeyPage

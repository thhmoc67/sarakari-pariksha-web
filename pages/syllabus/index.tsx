import React from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'

interface Props {}

const SyllabusPage: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksa</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <p>home page</p>
      </Layout>
    </>
  )
}

SyllabusPage.getInitialProps = async ({req}: any) => {
  return {}
}

export default SyllabusPage

import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
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

export default Home

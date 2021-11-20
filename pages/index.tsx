import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Home from '../containers/Home'

const App: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sarkari Pariksa</title>
        <meta name="description" content="Sarkari Pariksa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Home />
      </Layout>
    </>
  )
}

export default App

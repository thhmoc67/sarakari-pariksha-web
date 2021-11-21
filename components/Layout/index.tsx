import Navbar from './navbar'
import Footer from './footer'
import styles from './Layout.module.css'
import Head from 'next/head'

export default function Layout({children}: any) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

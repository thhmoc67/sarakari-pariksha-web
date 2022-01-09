import Navbar from './navbar'
import Footer from './footer'
import styles from './Layout.module.css'
import Head from 'next/head'
import Image from 'next/image'
import newIcon from '../../assets/images/logo.jpg'

export default function Layout({children}: any) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Image src={newIcon} alt={'newicon'} width={1024} height={140} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

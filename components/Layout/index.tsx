import Navbar from './navbar'
import Footer from './footer'
import styles from './Layout.module.css'

export default function Layout({children}: any) {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

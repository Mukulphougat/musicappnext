import styles from "../styles/header.module.css"
import Link from "next/link";
const HeaderNav = () => {
  return(
      <div className={styles.header}>
          <Link href="/">
              <a className={styles.homeButton}>Home</a>
          </Link>
          <Link href="/uploadMySong">
              <a className={styles.buttonContainer}>Upload Song</a>
          </Link>
      </div>
  )
}
export default HeaderNav
import Link from "next/link"
import styles from "./footer.module.css"
import packageJSON from "../package.json"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        ** This is still a Work-In-Progress App. Report any issues to
        tofik.khan@mkausa.org
      </div>
    </footer>
  )
}

import Link from "next/link"
import styles from "./footer.module.css"
import packageJSON from "../package.json"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      This is <strong>not</strong> an official application from Majlis
      Khuddam-ul-Ahmadiyya.
    </footer>
  )
}

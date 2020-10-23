import React from 'react'
import s from './FooterStyles.module.scss'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <p>
        © {new Date().getFullYear()} {''}
        Sove Mykt All Rights Reserved. Privacy Policy
      </p>
    </footer>
  )
}

import React from 'react'
import s from './FooterStyles.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'

export default function Footer() {
  const { fragment } = useStaticQuery(graphql`
    {
      fragment: googleSpreadsheetPage {
        ...PageFields
      }
    }
  `)

  return (
    <footer className={s.footer}>
      <div className={s.links}>
        <Link className={s.link}>Link 1</Link>
        <Link className={s.link}>Link 2</Link>
        <Link className={s.link}>Link 3</Link>
      </div>

      <p>
        © {new Date().getFullYear()} {''}
        {fragment.footerText}
      </p>
    </footer>
  )
}

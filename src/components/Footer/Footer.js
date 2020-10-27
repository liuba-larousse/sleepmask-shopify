import React from 'react'
import s from './FooterStyles.module.scss'
import { graphql, useStaticQuery } from 'gatsby'

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
      <p>
        © {new Date().getFullYear()} {''}
        {fragment.footerText}
      </p>
    </footer>
  )
}

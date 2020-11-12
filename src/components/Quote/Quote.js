import React from 'react'
import s from './QuoteStyles.module.scss'
import { graphql, useStaticQuery } from 'gatsby'

export default function Quote() {
  const { fragment } = useStaticQuery(graphql`
    {
      fragment: googleSpreadsheetPage {
        ...PageFields
      }
    }
  `)

  return (
    <section className={s.container}>
      <h1>{fragment.pageQuote}</h1>
    </section>
  )
}

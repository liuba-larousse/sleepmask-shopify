import React from 'react'
import s from './SalesbarStyles.module.scss'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { FaRegHandPointer } from 'react-icons/fa'
import { graphql, useStaticQuery } from 'gatsby'

export default function SalesBar() {
  const { fragment } = useStaticQuery(graphql`
    {
      fragment: googleSpreadsheetPage {
        ...PageFields
      }
    }
  `)

  return (
    <div className={s.container} onClick={() => scrollTo('#sales')}>
      <h1>{fragment.salesBar}</h1>
      <span>
        <FaRegHandPointer />
      </span>
    </div>
  )
}

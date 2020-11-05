import React from 'react'
import s from './SalesbarStyles.module.scss'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { FaRegHandPointer } from 'react-icons/fa'

export default function SalesBar() {
  return (
    <div className={s.container} onClick={() => scrollTo('#sales')}>
      <h1>I am a sales pitch. Buy 1 Mask and get 50% off second Mask. </h1>
      <span>
        <FaRegHandPointer />
      </span>
    </div>
  )
}

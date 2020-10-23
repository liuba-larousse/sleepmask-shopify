import React from 'react'
import Img from 'gatsby-image'
import s from '../InfoGridStyles.module.scss'
import { button_second } from '~/css/components.module.scss'
import scrollTo from 'gatsby-plugin-smoothscroll'

export default function InfoCard({ img, title, desc }) {
  return (
    <>
      <section className={s.container}>
        <div className={s.img_area}>
          <Img className={s.image} fluid={img} />
        </div>
        <div className={s.text_area}>
          <h2>{title}</h2>
          <p>{desc}</p>
          <button
            onClick={() => scrollTo('#product')}
            className={button_second}
          >
            buy now
          </button>
        </div>
      </section>
    </>
  )
}

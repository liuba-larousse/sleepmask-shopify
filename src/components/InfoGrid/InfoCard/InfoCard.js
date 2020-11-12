import React from 'react'
import Img from 'gatsby-image'
import s from '../InfoGridStyles.module.scss'
import { button_second } from '~/css/components.module.scss'
import scrollTo from 'gatsby-plugin-smoothscroll'
import propTypes from 'prop-types'

export default function InfoCard({ img, title, desc, btn }) {
  return (
    <>
      <section className={s.container}>
        <div className={s.img_area}>
          <Img className={s.image} fluid={img} />
        </div>
        <div className={s.text_area}>
          <h3>{title}</h3>
          <p>{desc}</p>
          <button
            onClick={() => scrollTo('#product')}
            className={`${button_second} ${s.btn_buy}`}
          >
            {btn}
          </button>
        </div>
      </section>
    </>
  )
}

InfoCard.propTypes = {
  title: propTypes.string,
  desc: propTypes.string,
  btn: propTypes.string,
  img: propTypes.object,
}

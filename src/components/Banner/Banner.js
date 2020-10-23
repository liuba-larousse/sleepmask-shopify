import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import s from './BannerStyles.module.scss'
import { button_main } from '~/css/components.module.scss'
import scrollTo from 'gatsby-plugin-smoothscroll'

export default function Banner() {
  const { banner } = useStaticQuery(graphql`
    {
      banner: file(relativePath: { eq: "foot-banner.jpeg" }) {
        childImageSharp {
          fluid(fit: COVER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const { fluid } = banner.childImageSharp
  return (
    <section>
      <BackgroundImage className={s.image} fluid={fluid}>
        <div className={s.overlay}></div>
        <div className={s.container}>
          <h1>Ready to bring serenity into your life?</h1>
          <button
            className={`${button_main} ${s.link}`}
            onClick={() => scrollTo('#product')}
          >
            shop now
          </button>
        </div>
      </BackgroundImage>
    </section>
  )
}

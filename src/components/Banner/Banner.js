import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import s from './BannerStyles.module.scss'
import { button_main } from '~/css/components.module.scss'
import scrollTo from 'gatsby-plugin-smoothscroll'

export default function Banner() {
  const { banner, fragment } = useStaticQuery(graphql`
    {
      banner: file(relativePath: { eq: "foot-banner.jpeg" }) {
        childImageSharp {
          fluid(fit: COVER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      fragment: googleSpreadsheetPage {
        ...PageFields
      }
    }
  `)

  const { fluid } = banner.childImageSharp
  return (
    <section>
      <BackgroundImage className={s.image} fluid={fluid}>
        <div className={s.overlay}></div>
        <div className={s.container}>
          <h1>{fragment.bannerQuote}</h1>
          <button
            className={`${button_main} ${s.link}`}
            onClick={() => scrollTo('#product')}
          >
            {fragment.btnBannerSection}
          </button>
        </div>
      </BackgroundImage>
    </section>
  )
}

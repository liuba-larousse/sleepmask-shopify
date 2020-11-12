import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import s from './HeroStyles.module.scss'
import { button_main } from '~/css/components.module.scss'
import scrollTo from 'gatsby-plugin-smoothscroll'

export default function Hero() {
  return (
    <StaticQuery
      query={graphql`
        {
          file(relativePath: { eq: "hero.jpg" }) {
            childImageSharp {
              fluid(fit: COVER, cropFocus: NORTHEAST) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          fragment: googleSpreadsheetPage {
            ...PageFields
          }
        }
      `}
      render={data => {
        // Set ImageData.
        const imageData = data.file.childImageSharp.fluid
        return (
          <>
            <BackgroundImage className={s.image} fluid={imageData}>
              <div className={s.overlay}></div>
              <div className={s.container}>
                <h1>{data.fragment.heroTitle}</h1>
                <h2>{data.fragment.heroSubtitle}</h2>

                <button
                  onClick={() => scrollTo('#product')}
                  className={`${s.button} ${button_main}`}
                >
                  {data.fragment.btnHeroSection}
                </button>
              </div>
            </BackgroundImage>
          </>
        )
      }}
    />
  )
}

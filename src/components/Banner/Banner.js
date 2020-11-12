import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { button_second } from '~/css/components.module.scss'
import s from './BannerStyles.module.scss'

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
          <form
            action="https://sovemykt.us2.list-manage.com/subscribe/post?u=fa8e66857cb1b20aeee5ce88a&amp;id=caab10f1f1"
            method="post"
            // id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div className={s.newsletter}>
              <h2>{fragment.signUpText}</h2>
              <label htmlFor="EMAIL" visible="false"></label>
              <input
                type="email"
                id="mce-EMAIL"
                name="EMAIL"
                placeholder="email@gmail.com"
              ></input>
              <div id="mce-responses" className="clear">
                <div className="response" id="mce-error-response"></div>
                <div className="response" id="mce-success-response"></div>
              </div>
              <input
                className={button_second}
                type="submit"
                value="Subscribe"
                name={fragment.subscribe}
                id="mc-embedded-subscribe"
              ></input>
            </div>
          </form>
        </div>
      </BackgroundImage>
    </section>
  )
}

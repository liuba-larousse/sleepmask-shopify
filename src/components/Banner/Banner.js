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
          <h1>{fragment.bannerQuote}</h1>
          <h2>Sign up for newsletter today:</h2>

          <form
            action="https://sovemykt.us2.list-manage.com/subscribe/post?u=fa8e66857cb1b20aeee5ce88a&amp;id=caab10f1f1"
            method="post"
            // id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate"
            target="_blank"
            novalidate
          >
            <div className={s.newsletter}>
              <label for="FNAME" visible="false"></label>
              <input
                type="text"
                id="mce-FNAME"
                name="FNAME"
                placeholder="first name"
              ></input>
              <label for="LNAME" visible="false"></label>
              <input
                type="text"
                id="mce-LNAME"
                name="LAME"
                placeholder="last name"
              ></input>
              <label for="EMAIL" visible="false"></label>
              <input
                type="email"
                id="mce-EMAIL"
                name="EMAIL"
                placeholder="email@gmail.com"
              ></input>
              <div id="mce-responses" class="clear">
                <div class="response" id="mce-error-response"></div>
                <div class="response" id="mce-success-response"></div>
              </div>
              <input
                className={button_second}
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
              ></input>
            </div>
          </form>
        </div>
      </BackgroundImage>
    </section>
  )
}

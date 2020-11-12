import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import InfoCard from './InfoCard/InfoCard'
import s from './InfoGridStyles.module.scss'

export default function InfoGrid() {
  const data = useStaticQuery(graphql`
    {
      img1: file(relativePath: { eq: "info1.jpeg" }) {
        childImageSharp {
          fluid(fit: COVER, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img2: file(relativePath: { eq: "info2.jpeg" }) {
        childImageSharp {
          fluid(fit: COVER, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      img3: file(relativePath: { eq: "info3.jpeg" }) {
        childImageSharp {
          fluid(fit: COVER, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allGoogleSpreadsheetCards {
        cards: nodes {
          title
          description
          id
          button
        }
      }
    }
  `)

  const { cards } = data.allGoogleSpreadsheetCards

  return (
    <div className={s.grid}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#32e0c4"
          fillOpacity="0.2"
          d="M45.9,-51.2C58.8,-43.9,68,-28.7,72.2,-11.7C76.4,5.3,75.5,24.2,66.4,36.8C57.3,49.5,40,56,22.8,61.8C5.7,67.7,-11.4,72.8,-24.9,68.1C-38.5,63.3,-48.5,48.6,-52.6,34C-56.6,19.5,-54.6,5.1,-53.4,-10.7C-52.1,-26.5,-51.6,-43.7,-42.8,-51.8C-34.1,-59.9,-17,-58.8,-0.3,-58.5C16.5,-58.2,33,-58.6,45.9,-51.2Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#32e0c4"
          fillOpacity="0.2"
          d="M45.9,-51.2C58.8,-43.9,68,-28.7,72.2,-11.7C76.4,5.3,75.5,24.2,66.4,36.8C57.3,49.5,40,56,22.8,61.8C5.7,67.7,-11.4,72.8,-24.9,68.1C-38.5,63.3,-48.5,48.6,-52.6,34C-56.6,19.5,-54.6,5.1,-53.4,-10.7C-52.1,-26.5,-51.6,-43.7,-42.8,-51.8C-34.1,-59.9,-17,-58.8,-0.3,-58.5C16.5,-58.2,33,-58.6,45.9,-51.2Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#32e0c4"
          fillOpacity="0.2"
          d="M41.6,-49.6C51.3,-41.5,54.7,-25.9,56.2,-10.8C57.8,4.2,57.5,18.6,53.3,35.2C49,51.9,40.8,70.6,27.7,75C14.5,79.4,-3.5,69.3,-23.2,62.7C-42.9,56,-64.2,52.7,-70.3,41.1C-76.3,29.5,-67.1,9.7,-59.4,-6.4C-51.7,-22.5,-45.6,-34.8,-36,-42.9C-26.3,-51.1,-13.2,-55.1,1.4,-56.8C16,-58.5,31.9,-57.8,41.6,-49.6Z"
          transform="translate(100 100)"
        />
      </svg>
      <InfoCard
        title={cards[0].title}
        desc={cards[0].description}
        img={data.img1.childImageSharp.fluid}
        btn={cards[0].button}
      />
      <InfoCard
        title={cards[1].title}
        desc={cards[1].description}
        img={data.img2.childImageSharp.fluid}
        btn={cards[1].button}
      />
      <InfoCard
        title={cards[2].title}
        desc={cards[2].description}
        img={data.img3.childImageSharp.fluid}
        btn={cards[2].button}
      />
    </div>
  )
}

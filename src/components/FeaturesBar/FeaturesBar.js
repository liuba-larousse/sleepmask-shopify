import React from 'react'
import s from './FeaturesBarStyles.module.scss'
import { useStaticQuery, graphql } from 'gatsby'

export default function FeaturesBar({ num }) {
  const data = useStaticQuery(graphql`
    {
      allGoogleSpreadsheetFeatures {
        barFeatures: nodes {
          id
          title
          googleSpreadsheetId
          png
        }
      }
    }
  `)
  const { barFeatures } = data.allGoogleSpreadsheetFeatures

  return (
    <section className={s.container}>
      {(num === 1 ? barFeatures.slice(0, 3) : barFeatures.slice(3, 6)).map(
        feature => (
          <div className={s.box} key={feature.id}>
            <img
              className={s.icon}
              src={feature.png}
              alt={feature.title}
              width="70px"
              height="70px"
            />
            <h3>{feature.title}</h3>
          </div>
        )
      )}
    </section>
  )
}

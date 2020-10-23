import React from 'react'
import s from './FeaturesBarStyles.module.scss'

export default function FeaturesBar({ data }) {
  return (
    <section className={s.container}>
      {data.map(feature => (
        <div className={s.box}>
          <span className={s.icon}>{feature.icon}</span>
          <h3>{feature.title}</h3>
        </div>
      ))}
    </section>
  )
}

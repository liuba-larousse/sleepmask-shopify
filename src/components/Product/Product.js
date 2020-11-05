import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { QuantityAdder } from '../QuantityAdder/QuantityAdder'
import s from './ProductStyles.module.scss'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { FaStar } from 'react-icons/fa'
import scrollTo from 'gatsby-plugin-smoothscroll'

export default function Product() {
  const { product, fragment } = useStaticQuery(
    graphql`
      {
        product: shopifyProduct {
          ...ProductFields
        }
        fragment: googleSpreadsheetPage {
          ...PageFields
        }
      }
    `
  )

  //values
  const { title, description, variants, images } = product
  const { price, compareAtPrice, shopifyId } = variants[0]
  const variantId = shopifyId

  //carousel
  const length = product.images.length - 1
  const [index, setIndex] = useState(0)
  const handleNext = () =>
    index === length ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () =>
    index === 0 ? setIndex(length) : setIndex(index - 1)
  const { fluid } = product.images[index].localFile.childImageSharp

  // Add to cart

  return (
    <section id="product" className={s.container}>
      <div className={s.carousel}>
        <Img className={s.image} fluid={fluid} />
        <div className={s.buttons}>
          <button className={s.prev} onClick={() => handlePrevious()}>
            <HiArrowLeft />
          </button>
          <button className={s.next} onClick={() => handleNext()}>
            <HiArrowRight />
          </button>
        </div>

        <div className={s.small_grid}>
          {images.map(each => (
            <Img
              className={s.thumbnail}
              fluid={each.localFile.childImageSharp.fluid}
              key={each.localFile.id}
            />
          ))}
        </div>
      </div>
      <div className={s.info}>
        <h1>{title}</h1>
        <button onClick={() => scrollTo('#reviews')} className={s.stars}>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </button>
        <div className={s.price}>
          <h2>{parseInt(price).toFixed(0)} ,-</h2>
          <h2>{parseInt(compareAtPrice).toFixed(0)} ,-</h2>
        </div>

        <div className={s.line}></div>
        <QuantityAdder
          variantId={variantId}
          text={fragment.btnProductSection}
        />
        <p>{description}</p>
      </div>
    </section>
  )
}

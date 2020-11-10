import React, { useState, useEffect } from 'react'
import s from './ReviewsStyles.module.scss'
import { useStaticQuery, graphql } from 'gatsby'
import { MdVerifiedUser } from 'react-icons/md'
import { HiThumbUp } from 'react-icons/hi'
import { FaStar } from 'react-icons/fa'
import Img from 'gatsby-image'
import StateContext from '~/context/StateContext'

const showItems = 3
let reviews = []

export default function Reviews() {
  const { data, product, reviewThumbnails } = useStaticQuery(graphql`
    {
      data: allGoogleSpreadsheetReviews {
        edges {
          node {
            id
            imageUrl
            initials
            name
            stars
            text
            featureText
            standouts
            date
          }
        }
      }
      product: shopifyProduct {
        ...ProductFields
      }
      reviewThumbnails: allFile(
        filter: { relativeDirectory: { eq: "reviews" } }
      ) {
        nodes {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)
  //get thumbnails
  const thumbnails = reviewThumbnails.nodes

  //showmore
  const { edges } = data

  const [reviewsToShow, setReviewsToShow] = useState([])
  const [more, setMore] = useState(1)

  const loopWithSlice = (start, end) => {
    const slicedReviews = [...edges].slice(start, end)
    reviews = [...reviews, ...slicedReviews]
    setReviewsToShow(reviews)
  }

  useEffect(() => {
    loopWithSlice(0, showItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleShowMore = () => {
    loopWithSlice(more, more + showItems)
    setMore(more + showItems)
  }

  //product image
  // const { fluid } = product.nodes[0].images[0].image.childImageSharp
  const { fluid } = product.images[0].localFile.childImageSharp

  //reviews
  const reviewsDisplayed = reviewsToShow.map((review, index) => {
    const stars = []
    let number = parseInt(review.node.stars)
    for (let i = 0; i < number; i++) {
      stars.push(<FaStar />)
    }
    return (
      <div key={index} className={`${s.grid} ${s.animation}`}>
        <div className={s.date}>{review.node.date}</div>
        <div className={s.left_top}>
          <div className={s.buyer}>
            <div className={s.buyer_init}>{review.node.initials}</div>
            <div className={s.buyer_name}>
              <p>{review.node.name}</p>
              <p>
                <MdVerifiedUser />
                Verified buyer
              </p>
            </div>
          </div>
          <div className={s.line}></div>
          <div className={s.product}>
            <div className={s.product_img}>
              <Img fluid={fluid} />
            </div>
            <div className={s.product_name}>
              <p>Reviewing</p>
              <p>Sleep Mask</p>
            </div>
          </div>

          <div className={s.product_standouts}>
            <p>Product Standouts</p>
            <p>{review.node.standouts}</p>
          </div>
        </div>

        <div className={s.right_bottom}>
          <div className={s.stars}>{stars}</div>
          <p>
            <span>
              <HiThumbUp /> {''}
            </span>
            I recommend this product
          </p>
          <p>{review.node.featureText}</p>
          <p>{review.node.text}</p>

          <div className={s.satisfaction}>
            <p>Customer satisfaction</p>
            <div className={s.scale}>
              <div
                className={number === 5 ? s.circle5stars : s.circle4stars}
              ></div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  //Modal

  const { showing, toggle } = React.useContext(StateContext)

  return (
    <>
      <div
        className={showing ? `${s.modal_overlay} ${s.hidden}` : s.modal_overlay}
      ></div>
      <div className={showing ? `${s.modal} ${s.hidden}` : s.modal}></div>
      <section id="reviews" className={s.container}>
        <h1 className={s.title}>Reviews</h1>
        <div className={s.grid}>
          <div className={s.left_top_total}>
            <div className={s.rating}>
              <div>4.9</div>
              <div>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
            <p>Based on 120 reviews</p>
            <div className={s.ratingbox}>
              <p>5 stars</p>
              <div className={`${s.box} ${s.stars5}`}>
                <p>10</p>
              </div>
            </div>
            <div className={s.ratingbox}>
              <p>4 stars</p>
              <div className={`${s.box} ${s.stars4}`}>
                <p>15</p>
              </div>
            </div>
            <div className={s.ratingbox}>
              <p>3 stars</p>
              <div className={`${s.box} ${s.stars3}`}>
                {' '}
                <p>0</p>
              </div>
            </div>
            <div className={s.ratingbox}>
              <p>2 stars</p>
              <div className={`${s.box} ${s.stars3}`}>
                <p>0</p>{' '}
              </div>
            </div>
            <div className={s.ratingbox}>
              <p>1 stars</p>
              <div className={`${s.box} ${s.stars3}`}>
                <p>0</p>
              </div>
            </div>
          </div>

          <div className={s.right_bottom_total}>
            <div className={s.images_title}>
              <div>100%</div>
              <p>of reviews recoomend this product</p>
            </div>
            <div className={s.thumbnail_grid}>
              {thumbnails.map((each, index) => (
                <div onClick={() => toggle(index)}>
                  <Img
                    className={s.thumbnail}
                    fluid={each.childImageSharp.fluid}
                    key={each.childImageSharp.src}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {reviewsDisplayed}
        <button className={s.btn_expand} onClick={handleShowMore}>
          Show more
        </button>
      </section>
    </>
  )
}

import React from 'react'
import StateContext from '~/context/StateContext'
import { useStaticQuery, graphql } from 'gatsby'
import s from './ModalStyles.module.scss'
import { CgClose } from 'react-icons/cg'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import Img from 'gatsby-image'

export default function Modal() {
  const { showing, toggle, index, setIndex } = React.useContext(StateContext)

  const { reviewThumbnails } = useStaticQuery(graphql`
    {
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

  //carousel
  const length = thumbnails.length - 1
  //   const [index, setIndex] = React.useState(0)
  console.log('index:', index)
  const handleNext = () =>
    index === length ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () =>
    index === 0 ? setIndex(length) : setIndex(index - 1)

  const { fluid } = thumbnails[index].childImageSharp
  console.log('fluid in modal:', fluid)
  return (
    <>
      <div
        className={showing ? s.modal_overlay : `${s.modal_overlay} ${s.hidden}`}
      ></div>
      <div className={showing ? s.container : `${s.container} ${s.hidden}`}>
        <div className={s.modal}>
          <button className={s.btn_close} onClick={() => toggle(0)}>
            <CgClose />
          </button>
          <button className={s.btn_prev} onClick={() => handlePrevious()}>
            <HiArrowLeft />
          </button>
          <button className={s.btn_next} onClick={() => handleNext()}>
            <HiArrowRight />
          </button>
          <Img className={s.thumbnail} fluid={fluid} />
        </div>
      </div>
    </>
  )
}

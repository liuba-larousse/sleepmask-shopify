import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import s from './SalesSectionStyles.module.scss'
import { button_main } from '~/css/components.module.scss'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import CartContext from '~/context/CartContext'

import SideBarStateContext from '~/context/SideBarStateContext'

export default function SalesSection() {
  const { file, product } = useStaticQuery(graphql`
    {
      product: shopifyProduct {
        ...ProductFields
      }
      file(relativePath: { eq: "upsale.jpeg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const { shopifyId } = product.variants[0]
  const variantId = shopifyId
  const { fluid } = file.childImageSharp

  const { updateLineItem, checkout } = React.useContext(CartContext)
  console.log(checkout)

  // const { quantity, setQuantity } = React.useContext(QuantityStateContext)
  const [quantity, setQuantity] = React.useState(2)

  // open navbar on click
  const { isOpen, setOpen } = React.useContext(SideBarStateContext)

  return (
    <section id="sales" className={s.container}>
      <h1> Sales Section</h1>
      <div className={s.grid}>
        <div className={s.left_top}>
          <Img fluid={fluid} className={s.img} />
        </div>
        <div className={s.right_bottom}>
          <div className={s.bulletpoint}>
            <IoMdCheckmarkCircleOutline />
            <h3>Bulletpoint 1</h3>
          </div>
          <div className={s.bulletpoint}>
            <IoMdCheckmarkCircleOutline />
            <h3>Bulletpoint 2</h3>
          </div>
          <div className={s.bulletpoint}>
            <IoMdCheckmarkCircleOutline />
            <h3>Bulletpoint 3</h3>
          </div>
          <div className={s.line}></div>
          <button
            className={`${button_main} ${s.btn_buy}`}
            onClick={() => {
              setOpen(!isOpen)
              setQuantity(2)
              updateLineItem({
                variantId,
                quantity: parseInt(quantity, 10),
              })
              console.log('quantity after:', quantity)
            }}
          >
            Get the deal
          </button>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import PropTypes from 'prop-types'
import CartContext from '~/context/CartContext'
import s from './NavbarStyles.module.scss'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { FaShoppingBag } from 'react-icons/fa'
import StateContext from '~/context/StateContext'
import SalesBar from '../SalesBar/SalesBar'
import { useStaticQuery, graphql } from 'gatsby'

export default function Navbar({ siteTitle }) {
  const { checkout } = React.useContext(CartContext)
  let totalQuantity = 0
  if (checkout) {
    checkout.lineItems.forEach(lineItem => {
      totalQuantity = totalQuantity + lineItem.quantity
    })
  }

  const { isOpen, setOpen } = React.useContext(StateContext)
  const openSideBar = () => {
    setOpen(!isOpen)
    console.log('open sidebar')
  }

  const { file } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const { fluid } = file.childImageSharp

  return (
    <>
      <nav>
        <SalesBar />
        <div className={s.cart}>
          <div className={s.icon_bkg}></div>
          <button className={s.btn_openCart} onClick={() => openSideBar()}>
            <FaShoppingBag className={s.icon} />
            <span className={s.counter}>{totalQuantity || 'O'}</span>
          </button>
        </div>
      </nav>
      <Img fluid={fluid} className={s.logo} />
    </>
  )
}

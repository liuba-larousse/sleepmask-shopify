import React from 'react'
import PropTypes from 'prop-types'
import CartContext from '~/context/CartContext'
import s from './NavbarStyles.module.scss'
import { Link } from 'gatsby'
import { FaShoppingBag } from 'react-icons/fa'
import SideBarStateContext from '~/context/SideBarStateContext'
import SalesBar from '../SalesBar/SalesBar'

export default function Navbar({ siteTitle }) {
  const { checkout } = React.useContext(CartContext)
  let totalQuantity = 0
  if (checkout) {
    checkout.lineItems.forEach(lineItem => {
      totalQuantity = totalQuantity + lineItem.quantity
    })
  }

  const { isOpen, setOpen } = React.useContext(SideBarStateContext)
  const openSideBar = () => {
    setOpen(!isOpen)
    console.log('open sidebar')
  }

  return (
    <>
      <nav>
        <SalesBar />
        <ul>
          {/* <li>
            <Link className={`${s.link} ${s.title}`} to="/">
              {siteTitle}
            </Link>
          </li> */}
          <li>
            <div className={s.icon_bkg}></div>
            <button className={s.btn_openCart} onClick={() => openSideBar()}>
              <FaShoppingBag className={s.icon} />
              <span className={s.counter}>{totalQuantity || 'O'}</span>
            </button>
          </li>
        </ul>
      </nav>
      <Link className={`${s.link} ${s.title}`} to="/">
        {siteTitle}
      </Link>
    </>
  )
}

Navbar.propTypes = {
  siteTitle: PropTypes.string,
}

Navbar.defaultProps = {
  siteTitle: ``,
}

import React from 'react'

import s from './SideCartStyles.module.scss'
import { button_flex, button_second } from '~/css/components.module.scss'
import { TiDelete } from 'react-icons/ti'
import { CgClose } from 'react-icons/cg'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import CartContext from '~/context/CartContext'
import StateContext from '~/context/StateContext'
import { QuantityAdjuster } from '../QuantityAdjuster/QuantityAdjuster'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

function SideCart() {
  const { product, file, fragment } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "empty.png" }) {
        childImageSharp {
          emptyCartImage: fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      product: shopifyProduct {
        ...ProductFields
      }
      fragment: googleSpreadsheetCart {
        ...CartFields
      }
    }
  `)
  const { emptyCartImage } = file.childImageSharp
  const { title, images, variants } = product
  const { price } = variants[0]
  const { fluid } = images[0].localFile.childImageSharp

  const { checkout, updateLineItem, removeLineItem } = React.useContext(
    CartContext
  )
  console.log('checkout:', checkout)
  console.log('line items:', checkout.lineItems)

  // const moreThanOneItemInCart =
  //   checkout &&
  //   checkout.lineItems &&
  //   checkout &&
  //   checkout.lineItems &&
  //   checkout.lineItems.length !== 0

  // const zeroItemsInCart =
  //   checkout &&
  //   checkout.lineItems &&
  //   checkout &&
  //   checkout.lineItems &&
  //   checkout.lineItems.length === 0

  const isCheckout = checkout && checkout.lineItems

  //quantity
  let totalQuantity = 0
  if (checkout) {
    checkout.lineItems.forEach(lineItem => {
      totalQuantity = totalQuantity + lineItem.quantity
      console.log('lineItem quantity:', lineItem.quantity)
    })
  }

  console.log('total quantity:', totalQuantity)

  //loading
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadCart() {
      if (checkout) {
        const products = await checkout.lineItems
      }
    }
    loadCart()
    setLoading(false)
  }, [checkout])

  //   discountedItem
  let discountedItem = {}
  let discount = 0
  if (isCheckout && totalQuantity > 1) {
    discountedItem = checkout.lineItems.find(
      item => item.discountAllocations.length > 0
    )
    discount = discountedItem.discountAllocations.map(
      discount => discount.allocatedAmount.amount
    )
  } else {
    discount = 0
  }
  //   console.log('discounted item:', discountedItem, 'discount:', discount)

  // Adjust qantity of items
  const handleAdjustQuantity = ({ quantity, variantId }) => {
    updateLineItem({ quantity, variantId })
  }

  const addItem = item => {
    handleAdjustQuantity({ variantId: item.variant.id, quantity: +1 })
  }

  //Remove item from list
  const removeItem = item => {
    removeLineItem(item.id)
  }

  const handleCheckout = () => {
    window.location.assign(checkout.webUrl)
  }

  //close cart
  const { isOpen, setOpen } = React.useContext(StateContext)

  const closeSideBar = () => {
    setTimeout(() => {
      setOpen(!isOpen)
    }, 500)
  }

  const ref = React.useRef()
  useOnClickOutside(ref, () => setOpen(false))

  const CartHeader = () => {
    return (
      <>
        <div className={s.header}>
          <h3>{fragment.yourCart}</h3>
          <h3>|</h3>
          <h3>
            {totalQuantity || '0'} {fragment.items}
          </h3>
          <button
            className={s.btn_close}
            onClick={() => closeSideBar()}
            aria-label="close"
          >
            <CgClose />
          </button>
        </div>
      </>
    )
  }

  const CartUpsale = () => {
    return checkout.lineItems
      .filter(item => item.discountAllocations.length === 0)
      .map(item =>
        totalQuantity % 2 !== 0 ? (
          <SlideDown className={'my - dropdown - slidedown'}>
            <div className={s.upsale}>
              <h3>{fragment.popupText}</h3>
              <div className={s.upsaleflex}>
                <div>
                  <Img className={s.imageUpsale} fluid={fluid}></Img>
                </div>
                <div>
                  <button
                    className={`${s.btn_addOne} ${button_second} `}
                    onClick={() => addItem(item)}
                  >
                    {fragment.popupBtn}
                  </button>
                </div>
              </div>
            </div>
          </SlideDown>
        ) : null
      )
  }

  const CartBody = () => {
    return checkout.lineItems
      .filter(item => item.discountAllocations.length === 0)
      .map(item => (
        <>
          <div className={s.body} key={item.variant.id}>
            <button
              className={s.btn_remove}
              onClick={() => removeItem(item)}
              aria-label="remove"
            >
              <TiDelete />
            </button>
            <div>
              <Img className={s.image} fluid={fluid}></Img>
            </div>
            <div className={s.body_right}>
              <h4>{title}</h4>
              <h4>{price} ,-</h4>
              <span>
                <QuantityAdjuster
                  totalQuantity={totalQuantity}
                  item={item}
                  onAdjust={handleAdjustQuantity}
                />
              </span>
            </div>
          </div>
        </>
      ))
  }

  const CartFooter = () => {
    return (
      <>
        {totalQuantity > 0 ? (
          <div className={s.discount}>
            <h3>{fragment.savings} </h3>
            <h3>{discount} ,- </h3>
          </div>
        ) : (
          <></>
        )}
        <div className={s.footer}>
          <h3>{fragment.subtotal} :</h3>
          <h3> {(isCheckout && checkout.totalPrice) || '0.00'} ,-</h3>
        </div>
        <div className={s.subfooter}>
          <button
            className={`${s.btn_checkout} ${button_flex}`}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </>
    )
  }

  const EmptyCart = () => {
    return (
      <div className={s.empty_flex}>
        <button className={s.btn_goback} onClick={() => closeSideBar()}>
          <h4>{fragment.continueShopping}</h4>
        </button>
        <h2>{fragment.cartEmpty}</h2>
        <Img fluid={emptyCartImage} className={s.empty_img} alt="emptycart" />
      </div>
    )
  }

  return (
    <section className={isOpen ? `${s.cart}  ${s.isOpen} ` : s.cart}>
      <div className={s.overlay}></div>

      <div ref={ref} className={s.container}>
        <CartHeader />
        {isLoading ? (
          <div>is loading...</div>
        ) : isCheckout && totalQuantity > 0 ? (
          <>
            <CartUpsale />
            <CartBody />
            <CartFooter />
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </section>
  )
}

export default SideCart

// Close cart on click outside of cart
function useOnClickOutside(ref, handler) {
  React.useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

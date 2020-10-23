import React from 'react'

import s from './SideCartStyles.module.scss'
import { button_flex, button_second } from '~/css/components.module.scss'
import { TiDelete } from 'react-icons/ti'
import { CgClose } from 'react-icons/cg'
import Loader from 'react-loader-spinner'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import CartContext from '~/context/CartContext'
import SideBarStateContext from '~/context/SideBarStateContext'
import { QuantityAdjuster } from '../QuantityAdjuster/QuantityAdjuster'

function SideCart() {
  const { product, file } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "empty.png" }) {
        childImageSharp {
          emptyCartImage: fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      product: allShopifyProduct {
        nodes {
          images {
            localFile {
              relativePath
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          title
          shopifyId
          variants {
            id
            shopifyId
          }
          priceRange {
            minVariantPrice {
              price: amount
            }
          }
        }
      }
    }
  `)
  const { emptyCartImage } = file.childImageSharp
  const {
    title,
    images,
    priceRange: {
      minVariantPrice: { price },
    },
  } = product.nodes[0]

  const image = images[0].localFile.childImageSharp.fluid

  const { checkout, updateLineItem, removeLineItem } = React.useContext(
    CartContext
  )
  console.log(checkout)

  //quantity
  let totalQuantity = 0
  if (checkout) {
    checkout.lineItems.forEach(lineItem => {
      totalQuantity = totalQuantity + lineItem.quantity
    })
  }

  //discountedItem
  //   let discountedItem = {}
  //   let discount = 0
  //   if (
  //     checkout?.lineItems &&
  //     checkout?.lineItems.length !== 0 &&
  //     totalQuantity > 1
  //   ) {
  //     discountedItem = checkout.lineItems.find(
  //       item => item.discountAllocations.length > 0
  //     )
  //     discount = discountedItem.discountAllocations.map(
  //       dicscount => dicscount.allocatedAmount.amount
  //     )
  //   }

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

  const [loading, setLoading] = React.useState(false)

  const handleCheckout = () => {
    setLoading(true)
    setTimeout(() => {
      window.open(checkout.webUrl)
      setLoading(false)
    }, 1500)
  }

  //close cart
  const { isOpen, setOpen } = React.useContext(SideBarStateContext)

  const closeSideBar = () => {
    setTimeout(() => {
      setOpen(!isOpen)
    }, 500)
  }

  const ref = React.useRef()
  useOnClickOutside(ref, () => setOpen(false))

  return (
    <section className={isOpen ? '' : s.hide}>
      <div className={s.overlay}></div>
      <div
        ref={ref}
        className={
          isOpen
            ? `${s.container} ${s.slidein}`
            : `${s.container} ${s.slideout}`
        }
      >
        <div className={s.header}>
          <h3>Your Cart</h3>
          <h3>|</h3>
          <h3>{totalQuantity || '0'} Items</h3>
          <button className={s.btn_close} onClick={() => closeSideBar()}>
            <CgClose />
          </button>
        </div>
        {totalQuantity % 2 !== 0 ? (
          checkout?.lineItems
            ?.filter(item => item.discountAllocations.length === 0)
            .map(item => (
              <div className={s.upsale}>
                <h3>Get one more {title} to get 50% off</h3>
                <div className={s.upsaleflex}>
                  <div>
                    <Img className={s.imageUpsale} fluid={image}></Img>
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <button
                      className={`${button_second} ${s.btn_addOne}`}
                      onClick={() => addItem(item)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <></>
        )}
        {checkout?.lineItems
          ?.filter(item => item.discountAllocations.length === 0)
          .map(item => (
            <>
              <div className={s.body} key={item.variant.id}>
                <button
                  className={s.btn_remove}
                  onClick={() => removeItem(item)}
                >
                  <TiDelete />
                </button>
                <div>
                  <Img className={s.image} fluid={image}></Img>
                </div>
                <div>
                  <h4>{title}</h4>
                  <h4>{price} ,-</h4>
                  <QuantityAdjuster
                    totalQuantity={totalQuantity}
                    item={item}
                    onAdjust={handleAdjustQuantity}
                  />
                  <h4> ${(item.quantity * item.variant.price).toFixed(2)}</h4>
                </div>
              </div>
            </>
          ))}
        {/* ----- */}
        {checkout?.lineItems && checkout?.lineItems.length !== 0 && (
          <>
            {totalQuantity > 1 ? (
              <div className={s.discount}>
                <h3>Your savings </h3>
                <h3>discount ,- </h3>
              </div>
            ) : (
              ''
            )}
            <div className={s.footer}>
              <h3>Subtotal :</h3>
              <h3> {checkout?.totalPrice || '0.00'} ,-</h3>
            </div>
            <div className={s.subfooter}>
              <button
                className={`${s.btn_checkout} ${button_flex}`}
                onClick={handleCheckout}
              >
                {loading ? (
                  <Loader
                    type="Oval"
                    color="#f6f5f5"
                    height={25}
                    width={25}
                    timeout={3000} //3 secs
                  />
                ) : (
                  'Checkout'
                )}
              </button>
            </div>
          </>
        )}

        {!!checkout?.lineItems && checkout?.lineItems.length === 0 && (
          <div className={s.empty_flex}>
            <button className={s.btn_goback} onClick={() => closeSideBar()}>
              <h4> Continue Shopping</h4>
            </button>
            <h2>Oops, You cart is empty at this moment</h2>
            <Img
              fluid={emptyCartImage}
              className={s.empty_img}
              alt="emptycart"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default SideCart

// Hook
function useOnClickOutside(ref, handler) {
  React.useEffect(
    () => {
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
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  )
}

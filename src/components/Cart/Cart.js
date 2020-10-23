// import React from 'react'
// import s from './cart.module.scss'
// import { button_flex } from '~/css/components.module.scss'
// import { TiDelete } from 'react-icons/ti'
// import Loader from 'react-loader-spinner'
// import { Link, useStaticQuery, graphql } from 'gatsby'
// import Img from 'gatsby-image'
// import CartContext from '~/context/CartContext'
// import { QuantityAdjuster } from '../QuantityAdjuster/QuantityAdjuster'

// const Cart = () => {
//   const { product, file } = useStaticQuery(graphql`
//     {
//       file(relativePath: { eq: "empty.png" }) {
//         childImageSharp {
//           emptyCartImage: fluid {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       product: allShopifyProduct {
//         nodes {
//           images {
//             localFile {
//               relativePath
//               childImageSharp {
//                 fluid {
//                   ...GatsbyImageSharpFluid
//                 }
//               }
//             }
//           }
//           title
//           shopifyId
//           variants {
//             id
//             shopifyId
//           }
//           priceRange {
//             minVariantPrice {
//               price: amount
//             }
//           }
//         }
//       }
//     }
//   `)
//   const { emptyCartImage } = file.childImageSharp
//   const {
//     title,
//     images,
//     priceRange: {
//       minVariantPrice: { price },
//     },
//   } = product.nodes[0]

//   const image = images[0].localFile.childImageSharp.fluid

//   const { checkout, updateLineItem, removeLineItem } = React.useContext(
//     CartContext
//   )

//   console.log(checkout)

//   // Adjust qantity of items
//   const handleAdjustQuantity = ({ quantity, variantId }) => {
//     updateLineItem({ quantity, variantId })
//   }

//   //Remove item from list
//   const removeItem = item => {
//     console.log(item)
//     removeLineItem(item.id)
//   }

//   const [loading, setLoading] = React.useState(false)

//   const handleCheckout = () => {
//     setLoading(true)
//     setTimeout(() => {
//       window.open(checkout.webUrl)
//       setLoading(false)
//     }, 1500)
//   }

//   return (
//     <section className={s.container}>
//       <h2 className={s.page_title}> Shopping cart</h2>
//       {checkout?.lineItems?.map(item => (
//         <>
//           <div className={s.flex}>
//             <div className={s.header}>
//               <h2>product</h2>
//               <h2>price</h2>
//               <h2>quantity</h2>
//               <h2>total</h2>
//             </div>
//             <div className={s.body} key={item.variant.id}>
//               <button className={s.btn_remove} onClick={() => removeItem(item)}>
//                 <TiDelete />
//               </button>
//               <div>
//                 <Img className={s.image} fluid={image}></Img>
//               </div>
//               <div>
//                 <h4>{title}</h4>
//                 <h4>$ {price}</h4>
//                 <QuantityAdjuster item={item} onAdjust={handleAdjustQuantity} />
//                 <h4> ${(item.quantity * item.variant.price).toFixed(2)}</h4>
//               </div>
//             </div>

//             <div className={s.footer}>
//               <h2>Subtotal:</h2>
//               <h2>$ {checkout?.totalPrice || '0.00'}</h2>
//             </div>
//             <div className={s.subfooter}>
//               <button
//                 className={`${s.btn_checkout} ${button_flex}`}
//                 onClick={handleCheckout}
//                 disabled={checkout.lineItems.length === 0}
//               >
//                 {loading ? (
//                   <Loader
//                     type="Oval"
//                     color="#f6f5f5"
//                     height={25}
//                     width={25}
//                     timeout={3000} //3 secs
//                   />
//                 ) : (
//                   'Checkout'
//                 )}
//               </button>
//               <Link className={s.link} to="/">
//                 <h3> Continue Shopping</h3>
//               </Link>
//             </div>
//           </div>
//         </>
//       ))}
//       {!!checkout.lineItems.length === 0 && (
//         <div className={s.empty_flex}>
//           <Link className={s.link} to="/">
//             <h3> Continue Shopping</h3>
//           </Link>
//           <h2>Oops, You cart is empty at this moment</h2>
//           <Img fluid={emptyCartImage} className={s.empty_img} alt="emptycart" />
//         </div>
//       )}
//     </section>
//   )
// }

// export default Cart

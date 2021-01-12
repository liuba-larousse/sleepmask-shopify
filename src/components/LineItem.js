// import React, { useContext } from 'react'
// import { Link } from 'gatsby'

// import CartContext from '~/context/CartContext'

// const LineItem = props => {
//     const { item } = props
//     const {
//       removeLineItem,
//       store: { client, checkout },
//     } = useContext(CartContext)
//     const image = item.image ? (
//       <img
//         src={item.image.src}
//         alt={`${item.title} product shot`}
//         height="60px"
//       />
//     ) : null
//     const handleRemove = () => {
//       removeLineItem(client, checkout.id, item.id)
//     }
//     return (
//       <>
//         {console.log(item)}
//         <Link to="/">{image}</Link>
//         <p>{item.title}</p>
//         {item.quantity}
//         <button onClick={handleRemove}>Remove</button>
//       </>
//     )
// }

// export default LineItem

import React from 'react'
import s from './QuantityAdderStyles.module.scss'
import { button_flex } from '~/css/components.module.scss'
import CartContext from '~/context/CartContext'
import SideBarStateContext from '~/context/SideBarStateContext'

function QuantityAdder({ variantId, text }) {
  const [quantity, setQuantity] = React.useState(1)
  // const { quantity, setQuantity } = React.useContext(QuantityStateContext)
  const { updateLineItem } = React.useContext(CartContext)

  const handleQuantityChange = e => {
    setQuantity(e.currentTarget.value)
    console.log(e.currentTarget.value)
  }

  const handleSumbit = e => {
    e.preventDefault()
    updateLineItem({ variantId, quantity: parseInt(quantity, 10) })
  }

  const { isOpen, setOpen } = React.useContext(SideBarStateContext)

  return (
    <div className={s.container}>
      <form onSubmit={handleSumbit}>
        <div className={s.input}>
          <label htmlFor="quantity">
            <h3>Quantity</h3>
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button
          onClick={() => setOpen(!isOpen)}
          type="submit"
          className={`${button_flex} ${s.btn_add}`}
        >
          {text}
        </button>
      </form>
    </div>
  )
}

export { QuantityAdder }

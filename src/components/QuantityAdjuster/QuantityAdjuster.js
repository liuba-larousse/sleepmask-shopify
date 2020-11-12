import React from 'react'
import s from './QuantityAdjusterStyles.module.scss'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'

function QuantityAdjuster({ item, onAdjust, totalQuantity }) {
  const handleDecrementQuantity = () => {
    onAdjust({ variantId: item.variant.id, quantity: -1 })
  }

  const handleIncrementQuantity = () => {
    onAdjust({ variantId: item.variant.id, quantity: +1 })
  }

  return (
    <div className={s.container}>
      <button className={s.btn_adjust} onClick={handleDecrementQuantity}>
        <FaMinusCircle />
      </button>
      <div>{totalQuantity}</div>
      <button className={s.btn_adjust} onClick={handleIncrementQuantity}>
        <FaPlusCircle />
      </button>
    </div>
  )
}

export { QuantityAdjuster }

QuantityAdjuster.propTypes = {
  item: PropTypes.object,
  variantId: PropTypes.string,
  onAdjust: PropTypes.object,
  totalQuantity: PropTypes.number,
}

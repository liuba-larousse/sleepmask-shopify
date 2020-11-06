import React from 'react'
import { CartContextProvider } from './src/context/CartContext'
import { StateContextProvider } from './src/context/StateContext'

export const wrapRootElement = ({ element }) => (
  <CartContextProvider>
    <StateContextProvider>{element}</StateContextProvider>
  </CartContextProvider>
)

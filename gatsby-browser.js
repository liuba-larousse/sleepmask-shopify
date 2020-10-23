import React from 'react'
import { CartContextProvider } from './src/context/CartContext'
import { SideBarStateContextProvider } from './src/context/SideBarStateContext'

export const wrapRootElement = ({ element }) => (
  <CartContextProvider>
    <SideBarStateContextProvider>{element}</SideBarStateContextProvider>
  </CartContextProvider>
)

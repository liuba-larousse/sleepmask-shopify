import React, { useState } from 'react'

const defaultState = {
  isOpen: false,
}

const SideBarStateContext = React.createContext(defaultState)
export default SideBarStateContext

export function SideBarStateContextProvider({ children }) {
  const [isOpen, setOpen] = useState(false)

  return (
    <SideBarStateContext.Provider
      value={{
        isOpen,
        setOpen,
      }}
    >
      {children}
    </SideBarStateContext.Provider>
  )
}

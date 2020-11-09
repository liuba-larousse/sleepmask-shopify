import React, { useState } from 'react'

const defaultState = {
  isOpen: false,
  showing: false,
  index: 0,
}

const StateContext = React.createContext(defaultState)
export default StateContext

export function StateContextProvider({ children }) {
  const [isOpen, setOpen] = useState(false)
  const [showing, isShowing] = useState(false)
  const [index, setIndex] = useState(0)
  function toggle(i) {
    setIndex(i)
    isShowing(!showing)
  }

  return (
    <StateContext.Provider
      value={{
        isOpen,
        setOpen,
        showing,
        toggle,
        index,
        setIndex,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

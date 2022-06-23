import React, { useRef, useEffect } from 'react'
import hasParent from './HasParenet'


const ClickOutside = ({ active = true, onClick, children }) => {
  /**
   * variable
   */
  const innerRef = useRef()

  /**
   * method
   */
  const handleClick = (event) => {
    if (!hasParent(event.target, innerRef?.current)) {
      if (typeof onClick === 'function') {
        onClick(event)
      }
    }
  }

  /**
   * hooks
   */
  useEffect(() => {
    if (active) {
      document.addEventListener('mousedown', handleClick)
      document.addEventListener('touchstart', handleClick)
    }

    return () => {
      if (active) {
        document.removeEventListener('mousedown', handleClick)
        document.removeEventListener('touchstart', handleClick)
      }
    }
  })

  /**
   * render
   */
  return React.cloneElement(children, { ref: innerRef })
}

export default ClickOutside
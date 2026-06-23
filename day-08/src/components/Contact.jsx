import React, { useContext } from 'react'
import { Ucontext } from '../context/Ucontext'

const Contact = () => {

const phone = useContext(Ucontext)
  
  return (
    <div>
      <h2>Contact</h2>
      <h3>Phone: {phone}</h3>
    </div>
  )
}
``
export default Contact

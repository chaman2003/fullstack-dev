import { useContext } from 'react'
import { Ucontext } from '../context/Ucontext'

const Footer = () => {

  const phone=useContext(Ucontext)

  return (
    <div>
      <h1>Footer</h1>
      <h3>Name: {phone}</h3>
    </div>
  )
}

export default Footer

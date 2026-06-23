import { createContext } from "react";
export const Ucontext = createContext()

const ContextProvider = (props) => {
  const phone = "+91 6361005641"
  

  return (
    <Ucontext.Provider value={phone}>
      {props.children}
    </Ucontext.Provider>
  )
}
export default ContextProvider


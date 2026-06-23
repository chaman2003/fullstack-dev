import { useState } from 'react'

function Form() {
    const [form,setForm] = useState({})

const onformchange = (e) => {
  setForm({...form,[e.target.name]:e.target.value})
  console.log(form)
}

  return (
    <div>
       <input type="text" value={form.email? form.email:" "} name="email"  onChange={onformchange} />
      <br />
      
      <input type="number" value={form.phone? form.phone:" "} name="phone" onChange={onformchange} />

    </div>
  )
}

export default Form

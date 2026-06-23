import { useParams } from 'react-router-dom'

function Username() {
     
    const params= useParams()
    
  return (
    <div>
      <h1>I am {params.uname}</h1>
    </div>
  )
}

export default Username

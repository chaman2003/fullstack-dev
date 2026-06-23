import Functionprop from './props/Functionprop.jsx'
import Welcome from './components/Welcome.jsx'
import Jsx from './components/Jsx.jsx'
import Props from './props/Props.jsx'
import Props2 from './props/Props2.jsx'
import Ternaryprop from './props/Ternaryprop.jsx'
import ArrayProp from './props/ArrayProp.jsx'
import ObjectProp from './props/ObjectProp.jsx'



const App = () => {
  const handle = () => alert("heyyy its nice")
  return (
    <div>

      <Welcome />
      <Jsx />
      <Functionprop click={handle} />
      <Props name="chaman" />
      <Props2 age={22} />
      <Ternaryprop bool={true} />
      <ArrayProp fruits={["Apple", "Banana", "Mango"]} />
      <ObjectProp user={[{ name: "Chaman", age: 21 }, { name: "Rishi", age: 22 }]} />
    </div>
  )
}

export default App;

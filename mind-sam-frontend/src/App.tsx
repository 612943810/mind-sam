import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Chat from './chat/Chat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
    {/* @ts-expect-error Server Component */}
      <Chat/>
    </Fragment>
  )
}
export default App;

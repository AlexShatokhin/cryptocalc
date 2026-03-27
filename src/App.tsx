import {Route, Switch} from "wouter"
import { CryptoCalc } from './CryptoCalc'
import { DiffieHellman } from './DiffieHellman'

function App() {
  return (
    <main>
        <Switch>
          <Route path="/" component={CryptoCalc} />
          <Route path="/diffie-hellman" component={DiffieHellman} />
          <Route><CryptoCalc /></Route>
        </Switch>
    </main>
  )
}

export default App

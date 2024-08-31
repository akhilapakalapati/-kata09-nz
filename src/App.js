import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


import Scan from './components/Scan'
import NotFound from './components/NotFound'
import Checkout from './components/Checkout';


import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Scan} />
      <Route exact path="/Checkout" component={Checkout} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App

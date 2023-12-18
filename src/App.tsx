import { createHashHistory } from 'history'
import Home from 'pages/Home'
import Mint from 'pages/Mint'
import Navbar from 'components/Navbar'
import NotFound from 'pages/NotFound'
import Router, { CustomHistory, Route } from 'preact-router'
import Wallet from 'components/Wallet'

export default function () {
  return (
    <div className="container mx-auto max-w-prose p-4 prose">
      <Wallet>
        <Navbar />
        <Router history={createHashHistory() as unknown as CustomHistory}>
          <Route path="/" component={Home} />
          <Route path="/:chainId/:address" component={Mint} />
          <Route default component={NotFound} />
        </Router>
      </Wallet>
    </div>
  )
}

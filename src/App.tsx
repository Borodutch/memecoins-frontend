import { createHashHistory } from 'history'
import Home from 'pages/Home'
import Link from 'components/Link'
import Mint from 'pages/Mint'
import Navbar from 'components/Navbar'
import NotFound from 'pages/NotFound'
import Router, { CustomHistory, Route } from 'preact-router'
import Terms from 'pages/Terms'
import Wallet from 'components/Wallet'

export default function () {
  return (
    <div className="container mx-auto max-w-prose p-4 prose">
      <Wallet>
        <Navbar />
        <Router history={createHashHistory() as unknown as CustomHistory}>
          <Route path="/" component={Home} />
          <Route path="/terms" component={Terms} />
          <Route path="/:chainId/:address" component={Mint} />
          <Route default component={NotFound} />
        </Router>
        <hr />
        <span className="opacity-50">
          <Link url="/#/terms">Terms of service</Link>. Build by{' '}
          <Link url="https://warpcast.com/borodutch">@borodutch</Link> (consider
          a follow!)
        </span>
      </Wallet>
    </div>
  )
}

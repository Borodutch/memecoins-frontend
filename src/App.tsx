import Deploy from 'components/Deploy'
import Form from 'components/Form'
import Link from 'components/Link'
// import Wallet from 'components/Wallet'

export default function () {
  return (
    // <Wallet>
    <div className="container mx-auto max-w-prose p-10 prose">
      <a href="/" className="no-underline">
        <h1>$MEMECOINS 🪙🚀💎🤲😂</h1>
      </a>
      <p>
        G'day traveler <i>*tips hat*</i>! So, you want to create some{' '}
        <b>$MEMECOINS</b>?! You're in the right place! Connect your wallet
        bellow, select what type of a $MEMECOIN you want to create, and press
        the <b>🌈BIG FAT DEPLOY BUTTON</b>!
      </p>
      <p>
        You can deploy to many networks (to save gas on txs on L2, for
        instance). In fact, screw that,{' '}
        <b>DEPLOY MULTIPLE TIMES TO DIFFERENT NETWORKS</b> 😱 After all, your
        $COINSCOINS™️ shouldn't be limited to just one network, right?!
      </p>
      <p>
        After you're done deploying, you will get a{' '}
        <Link url="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          memecoins.science
        </Link>{' '}
        link that you can send to fellow degens to mint as many of your coins as
        they can! And all the sweet (sweet) mint costs will go to the address
        you used to deploy! <b>AUTOMAGICALLY❗️ NANI???</b>
      </p>
      <h3>LFG 🚀</h3>
      <Form />
      <h3>Yeah 👏 baby 👏 yeah! 👏</h3>
      <Deploy />
    </div>
    // </Wallet>
  )
}

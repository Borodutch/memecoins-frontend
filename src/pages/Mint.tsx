import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link } from 'preact-router'
import { Memecoin__factory } from '@borodutch/memecoins-contract'
import { ethers } from 'ethers'
import { useAccount, useNetwork } from 'wagmi'
import { useEffect, useState } from 'preact/hooks'
import { useEthersSigner } from 'hooks/useEthers'
import GappedContainer from 'components/GappedContainer'
import UrlLink from 'components/Link'
import chainIdToBaseBlockExplorer from 'helpers/chainIdToBaseBlockExplorer'
import chainIdToName from 'helpers/chainIdToName'
import chainIdToProvider from 'helpers/chainIdToProvider'
import formatSupplyCap from 'helpers/formatSupplyCap'

export default function ({
  chainId,
  address,
}: {
  chainId: number
  address: string
}) {
  const [name, setName] = useState<string>('')
  const [symbol, setSymbol] = useState<string>('')
  const [mintRate, setMintRate] = useState<number | null>(null)
  const [supplyCap, setSupplyCap] = useState<bigint | null>(null)
  const [owner, setOwner] = useState<string | null>(null)
  const [purchaseAmount, setPurchaseAmount] = useState(100)
  const { isConnected, address: connectedAddress } = useAccount()
  const { chain } = useNetwork()
  const [loading, setLoading] = useState(false)
  const signer = useEthersSigner()
  const [mintError, setMintError] = useState('')
  const [mintSuccess, setMintSuccess] = useState(false)

  useEffect(() => {
    // Clean up
    setName('')
    setSymbol('')
    setMintRate(null)
    setSupplyCap(null)
    setOwner(null)

    // Get provider
    const provider = chainIdToProvider[chainId]
    // Load the contract
    const contract = Memecoin__factory.connect(address, provider)
    // Load the name and symbol
    async function loadInfo(_chainId: number, _address: string) {
      try {
        if (_chainId !== chainId || _address !== address) return
        const name = await contract.symbol()
        setName(name)
        const symbol = await contract.name()
        setSymbol(symbol)
        const rate = await contract.mintRate()
        setMintRate(Number(rate))
        const cap = await contract.supplyCap()
        setSupplyCap(cap)
        const owner = await contract.owner()
        setOwner(owner)
      } catch (e) {
        console.error(e)
      }
    }
    void loadInfo(chainId, address)
  }, [chainId, address])

  async function mint() {
    setLoading(true)
    setMintError('')
    setMintSuccess(false)
    try {
      if (!signer) {
        throw new Error('No signer')
      }
      if (!mintRate) {
        throw new Error('No mint rate')
      }
      const contract = Memecoin__factory.connect(address, signer)
      await contract.mint({
        value: ethers.parseEther(`${purchaseAmount / mintRate}`),
      })
      setMintSuccess(true)
    } catch (e) {
      console.error(e)
      setMintError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  async function withdraw() {
    try {
      if (!signer) {
        throw new Error('No signer')
      }
      if (!mintRate) {
        throw new Error('No mint rate')
      }
      const contract = Memecoin__factory.connect(address, signer)
      await contract.withdraw()
    } catch (e) {
      console.error(e)
      setMintError(e instanceof Error ? e.message : 'Unknown error')
    }
  }

  return (
    <div>
      <h2>OMG 😱 so, you want to mint the hot new $MEMECOIN?</h2>
      <p>
        LFG 🚀{' '}
        <UrlLink
          url={`${chainIdToBaseBlockExplorer[chainId]}/address/${address}`}
        >
          Here's the link
        </UrlLink>{' '}
        to the block explorer for the contract at{' '}
        <span className="break-all">{address}</span> in case you need it 👀
      </p>
      <p>
        Share this link so that others could mint 👉{' '}
        <UrlLink url={`https://memecoins.science/#/${chainId}/${address}`}>
          <span className="break-all">
            memecoins.science/#/{chainId}/{address}
          </span>
        </UrlLink>
      </p>
      <h2>
        {name ? `${name} on ${chainIdToName[chainId]}` : 'Loading the name...'}
      </h2>
      <h3>{symbol ? `${symbol}` : 'Loading the symbol...'}</h3>
      <p>
        {supplyCap === null || !symbol
          ? 'Loading the supply cap...'
          : supplyCap > 0
            ? `Supply cap is ${formatSupplyCap(
                supplyCap
              )}, this means there will always be at most ${formatSupplyCap(
                supplyCap
              )} ${symbol} in existence.`
            : 'Supply cap is unlimited! Degens can mint as much as they want!'}
      </p>
      {mintRate === null || !symbol ? (
        <p>Loading the mint rate...</p>
      ) : (
        <>
          <p>
            You get{' '}
            <b>
              {mintRate} {symbol}
            </b>{' '}
            for 1 ETH 🫦 That's a deal if I ever saw one!
          </p>
          <p>So, how much are you getting today?</p>
          <div className="flex flex-row gap-2 items-center">
            <input
              type="number"
              className="input input-bordered"
              value={purchaseAmount}
              min={0}
              onChange={(e) => {
                setPurchaseAmount(Number(e.currentTarget.value))
              }}
            />
            <span>{symbol}</span>
          </div>
          <div class="label">
            <span class="label-text-alt">
              Cost: ~{(purchaseAmount / mintRate).toFixed(3)} ETH
            </span>
          </div>
          <GappedContainer>
            <ConnectButton />
            {isConnected && chain?.id === +chainId && (
              <button
                className="btn btn-primary btn-lg"
                onClick={mint}
                disabled={loading}
              >
                {loading && '🤔 '}🌈 LE BIG FAT MINT BUTTON
              </button>
            )}
            {connectedAddress && owner && connectedAddress === owner && (
              <button className="btn btn-primary btn-lg" onClick={withdraw}>
                Withdraw ETH to the owner
              </button>
            )}
            {isConnected && chain?.id !== +chainId && (
              <div role="alert" class="alert alert-error">
                <span className="break-all">
                  Switch the network above to {chainIdToName[chainId]}!
                </span>
              </div>
            )}
            {mintError && (
              <div role="alert" class="alert alert-error">
                <span className="break-all">{mintError}</span>
              </div>
            )}
            {mintSuccess && (
              <div
                role="alert"
                class="alert alert-success flex flex-col items-start"
              >
                <span>
                  Congrats! You've successfully sent the transaction to mint{' '}
                  {symbol}! Check your wallet for the transaction status 🙏
                </span>
                <Link href="/">
                  <button className="btn">Create your own $MEMECOIN</button>
                </Link>
              </div>
            )}
          </GappedContainer>
        </>
      )}
    </div>
  )
}

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Memecoins__factory } from '@borodutch/memecoins-contract'
import { ethers } from 'ethers'
import { useAccount, useChainId } from 'wagmi'
import { useAtomValue } from 'jotai'
import { useEthersSigner } from 'hooks/useEthersSigner'
import { useState } from 'preact/hooks'
import GappedContainer from 'components/GappedContainer'
import chainIdToContract from 'helpers/chainIdToContract'
import formAtom from 'atoms/form'

export default function () {
  const { isConnected } = useAccount()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const form = useAtomValue(formAtom)
  const [hash, setHash] = useState<string>('')

  const chainId = useChainId()
  const contractAddress = chainIdToContract[chainId]

  const signer = useEthersSigner()

  async function deploy() {
    setLoading(true)
    setError('')
    setHash('')
    try {
      if (!signer) throw new Error('No signer')
      if (!contractAddress) throw new Error('Chain is not supported yet')
      // Get the contract
      const contract = Memecoins__factory.connect(contractAddress, signer)
      const tx = await contract.createMemecoin(
        await signer.getAddress(),
        form.name,
        form.symbol,
        form.premintAmount,
        form.initialMintRate,
        form.initialSupplyCap,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { value: ethers.parseEther('0.01') } as any
      )
      setHash(tx.hash)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : `${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <p>
        Time to put on big-person pants 👖💨 and deploy this baby of yours to a
        blockchain 🐣 Don't forget to pick the chain responsibly!
      </p>
      <GappedContainer>
        <ConnectButton />
        {isConnected && (
          <>
            {!contractAddress ||
            contractAddress === '0x0000000000000000000000000000000000000000' ? (
              <div role="alert" class="alert alert-error">
                Chain is not supported yet
              </div>
            ) : (
              <button
                className="btn btn-primary btn-lg"
                onClick={deploy}
                disabled={loading}
              >
                {loading && '🤔 '}🌈 BIG FAT DEPLOY BUTTON
              </button>
            )}
            {error && (
              <div role="alert" class="alert alert-error">
                <span className="break-all">{`${error}`}</span>
              </div>
            )}
            {hash && (
              <div role="alert" class="alert alert-success">
                <span>
                  Congrats! You sent the contract to the chain. Here's your
                  transaction hash:{' '}
                  <span className="break-all">{`${hash}`}</span>. Now wait for
                  the transaction to appear bellow and snatch that mint link 👏
                </span>
              </div>
            )}
          </>
        )}
      </GappedContainer>
    </>
  )
}

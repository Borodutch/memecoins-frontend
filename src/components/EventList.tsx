import { Memecoins__factory } from '@borodutch/memecoins-contract'
import { useAtom } from 'jotai'
import { useChainId } from 'wagmi'
import { useEffect } from 'preact/hooks'
import { useEthersProvider } from 'hooks/useEthersSigner'
import Link from 'components/Link'
import chainIdToContract from 'helpers/chainIdToContract'
import eventsAtom from 'atoms/events'

export default function () {
  const [events, setEvents] = useAtom(eventsAtom)
  const chainId = useChainId()
  const contractAddress = chainIdToContract[chainId]
  if (
    !contractAddress ||
    contractAddress === '0x0000000000000000000000000000000000000000'
  ) {
    return (
      <div role="alert" class="alert alert-error">
        Chain is not supported yet
      </div>
    )
  }

  const provider = useEthersProvider({ chainId })

  useEffect(() => {
    const contract = Memecoins__factory.connect(contractAddress, provider)
    const filter = contract.filters.MemecoinCreated()
    async function fetchEvents(tempChainId: number) {
      if (!contractAddress) return
      if (tempChainId !== chainId) return
      const events = await contract.queryFilter(filter)
      setEvents(
        events
          .map((event) =>
            event.args
              ? {
                  address: event.args.memecoin,
                  owner: event.args.owner,
                }
              : null
          )
          .reverse()
          .filter((v) => !!v) as { address: string; owner: string }[]
      )
      // listen to new events
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await contract.on(filter, (event: any) => {
        setEvents((events) => [
          {
            address: event.args.memecoin,
            owner: event.args.owner,
          },
          ...events,
        ])
      })
    }

    void fetchEvents(chainId)
    return () => {
      return contract.off(filter)
    }
  }, [chainId, contractAddress, provider, setEvents])

  return !events.length ? (
    <p>No contracts deployed yet!</p>
  ) : (
    <ul>
      {events.map((event) => (
        <li>
          <Link url={`https://memecoins.science/#/${chainId}/${event.address}`}>
            <span className="break-all">{event.address}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

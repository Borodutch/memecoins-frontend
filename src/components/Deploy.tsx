import { useAtom } from 'jotai'
import networkAtom from 'atoms/network'
import networks from 'helpers/networks'

export default function () {
  const [network, setNetwork] = useAtom(networkAtom)

  const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    const selectedNetwork = target.value as (typeof networks)[number]

    if (networks.includes(selectedNetwork)) {
      setNetwork(selectedNetwork)
    }
  }

  return (
    <>
      <p>
        Time to put on big-person pants 👖💨 and deploy this baby of yours to a
        blockchain 🐣 Select the chain you want to deploy to!
      </p>
      <select
        class="select select-bordered w-full max-w-xs"
        onChange={handleChange}
        value={network}
      >
        {networks.map((network) => (
          <option key={network}>{network}</option>
        ))}
      </select>
    </>
  )
}

import { useAtom } from 'jotai'
import GappedContainer from 'components/GappedContainer'
import Input from 'components/Input'
import formAtom from 'atoms/form'

export default function () {
  const [form, setForm] = useAtom(formAtom)
  return (
    <>
      <p>First, let's name the contract:</p>
      <GappedContainer>
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
        />
        <Input
          placeholder="Symbol"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.currentTarget.value })}
        />
      </GappedContainer>
      <p>
        Now, select how much of the sweet-sweet premine you want to yourselves
        (you will then need to manually airdrop aka transfer the preminted coins
        to the degens you promised the airdrop, sorry not sorry). For example,
        you can premine 1000 coins, or 10,000 coins, or whatever I'm not your
        mother to tell you what to do.
      </p>
      <p>Or leave it at 0, very noble of you.</p>
      <Input
        placeholder="How many coins to premint"
        type="number"
        min={0}
        value={form.premintAmount}
        onChange={(e) =>
          setForm({ ...form, premintAmount: e.currentTarget.valueAsNumber })
        }
      />
      <p>
        But how many coins can there be in existence? Like, what's the cap? I
        strongly suggest to chose 69,420,000 🫦
      </p>
      <Input
        placeholder="Max supply"
        type="number"
        min={0}
        value={form.initialSupplyCap}
        onChange={(e) =>
          setForm({ ...form, initialSupplyCap: e.currentTarget.valueAsNumber })
        }
      />
      <p>
        Finally, how many coins should degens get for <b>1 ETH</b>? Yes, full-on
        ETH, don't skim on coins. If you set it to 1, then 1 ETH will get you 1
        coin. If you set it to 100, then 1 ETH will get you 100 coins. If you
        set it to 2, then 1 ETH will get you 2 coins. You get the idea.
      </p>
      <Input
        placeholder="Coins per ETH"
        type="number"
        min={0}
        value={form.initialMintRate}
        onChange={(e) =>
          setForm({ ...form, initialMintRate: e.currentTarget.valueAsNumber })
        }
      />
    </>
  )
}

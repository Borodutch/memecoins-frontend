import { atom } from 'jotai'

export default atom({
  name: '$MEMECOINS',
  symbol: 'MEMECOINS',
  premintAmount: 1000,
  initialMintRate: 10,
  initialSupplyCap: 69420000,
})

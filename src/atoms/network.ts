import { atom } from 'jotai'
import networks from 'helpers/networks'

type NetworkType = (typeof networks)[number]

export default atom<NetworkType>('mainnet')

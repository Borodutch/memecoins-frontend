import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_ALCHEMY_MAINNET: str(),
  VITE_ALCHEMY_POLYGON: str(),
  VITE_ALCHEMY_BASE: str(),
  VITE_ALCHEMY_GOERLI: str(),
  VITE_CONTRACT_ADDRESS_MAINNET: str(),
  VITE_CONTRACT_ADDRESS_POLYGON: str(),
  VITE_CONTRACT_ADDRESS_BASE: str(),
  VITE_CONTRACT_ADDRESS_ZORA: str(),
  VITE_CONTRACT_ADDRESS_GOERLI: str(),
})

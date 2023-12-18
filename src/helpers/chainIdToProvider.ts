import { AlchemyProvider, JsonRpcProvider, Provider } from 'ethers'
import env from 'helpers/env'

export default {
  1: new AlchemyProvider(1, env.VITE_ALCHEMY_MAINNET),
  137: new AlchemyProvider(137, env.VITE_ALCHEMY_POLYGON),
  8453: new AlchemyProvider(8453, env.VITE_ALCHEMY_BASE),
  7777777: new JsonRpcProvider('https://rpc.zora.energy'),
  5: new AlchemyProvider(5, env.VITE_ALCHEMY_GOERLI),
} as { [index: number]: Provider | undefined }

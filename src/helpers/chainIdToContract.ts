import env from 'helpers/env'

export default {
  1: env.VITE_CONTRACT_ADDRESS_MAINNET,
  137: env.VITE_CONTRACT_ADDRESS_POLYGON,
  8453: env.VITE_CONTRACT_ADDRESS_BASE,
  7777777: env.VITE_CONTRACT_ADDRESS_ZORA,
  5: env.VITE_CONTRACT_ADDRESS_GOERLI,
} as { [index: number]: string | undefined }

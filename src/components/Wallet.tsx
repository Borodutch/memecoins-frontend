import '@rainbow-me/rainbowkit/styles.css'

import { PropsWithChildren } from 'preact/compat'
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { base, goerli, mainnet, optimism, polygon, zora } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import env from 'helpers/env'

const { chains, publicClient } = configureChains(
  [mainnet, polygon, base, zora, goerli, optimism],
  [
    alchemyProvider({ apiKey: env.VITE_ALCHEMY_MAINNET }),
    alchemyProvider({ apiKey: env.VITE_ALCHEMY_POLYGON }),
    alchemyProvider({ apiKey: env.VITE_ALCHEMY_BASE }),
    alchemyProvider({ apiKey: env.VITE_ALCHEMY_GOERLI }),
    alchemyProvider({ apiKey: env.VITE_ALCHEMY_OPTIMISM }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: '$MEMECOINS',
  projectId: '39ebc052619c35fcd4ffa4fc5decc216',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export default function ({ children }: PropsWithChildren) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

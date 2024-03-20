import {Libp2pOptions} from 'libp2p'
export interface IpfsCoreConfig {
    libp2pConfig: Libp2pOptions,
    additionalPeers?: string[]
}


import {IpfsCoreConfig} from "./ipfs-core-config";
import {webSockets} from "@libp2p/websockets";
import {all} from "@libp2p/websockets/filters";
import {webRTC} from "@libp2p/webrtc";
import {circuitRelayTransport} from "@libp2p/circuit-relay-v2";
import {noise} from "@chainsafe/libp2p-noise";
import {yamux} from "@chainsafe/libp2p-yamux";
import {identify} from "@libp2p/identify";
import {gossipsub} from '@chainsafe/libp2p-gossipsub'
import {bootstrap} from "@libp2p/bootstrap";

const list = [
    "/ip4/64.23.132.69/tcp/4001/p2p/12D3KooWCY6pdMkwDcK1Em3eC1eWd4E3x4PvRRCnxo5iXznpwztp",
    "/ip4/64.23.132.69/tcp/4002/ws/p2p/12D3KooWCY6pdMkwDcK1Em3eC1eWd4E3x4PvRRCnxo5iXznpwztp",
    "/ip4/64.23.132.69/udp/4001/quic-v1/p2p/12D3KooWCY6pdMkwDcK1Em3eC1eWd4E3x4PvRRCnxo5iXznpwztp",
    "/ip4/64.23.132.69/udp/4001/quic-v1/webtransport/certhash/uEiAhpYt7PH1W6z1iBYc3xxhIX4eqwcpHG2mEINT-61pKSQ/certhash/uEiA60qCszd-IFxCs85asYD86Vsd7SGjXxFuuyUIdSE5CCQ/p2p/12D3KooWCY6pdMkwDcK1Em3eC1eWd4E3x4PvRRCnxo5iXznpwztp",
]

export const IpfsCoreConfigDefault: IpfsCoreConfig = {
    libp2pConfig: {
        addresses: {
            listen: ['/webrtc']
        },
        peerDiscovery: [
            bootstrap({
                list
            })
        ],
        transports: [
            webSockets({
                filter: all
            }),
            webRTC(),
            circuitRelayTransport({
                discoverRelays: 1
            })
        ],
        connectionEncryption: [noise()],
        streamMuxers: [yamux()],
        connectionGater: {
            denyDialMultiaddr: () => false
        },
        services: {
            identify: identify(),
            pubsub: gossipsub({allowPublishToZeroTopicPeers: true})
        }
    }
}
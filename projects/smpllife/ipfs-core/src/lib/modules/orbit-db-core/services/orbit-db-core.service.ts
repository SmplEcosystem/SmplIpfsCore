/// <reference types="./orbitdb" />

import {Inject, Injectable, NgZone} from '@angular/core';
import {IpfsCoreService} from "../../../ipfs-core.service";
import {CID} from "multiformats";
import {base58btc} from "multiformats/bases/base58";
import {IpfsCoreConfigToken} from "../../../ipfs-core-config-token";
import {IpfsCoreConfig} from "../../../ipfs-core-config";
import {Helia} from "helia";
import {mnemonicToSeedSync} from 'bip39';
import {keys} from '@libp2p/crypto';

import {createOrbitDB, KeyStore, Identities} from '@orbitdb/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class OrbitDbCoreService {
    private _orbitDb: any
    private _subject = new BehaviorSubject<boolean>(false)
    init$ = this._subject.asObservable();

    private mnemonic = 'primary off palace rhythm attend human sample exact side domain fantasy attend tent end shadow gallery okay gallery clog announce cry senior citizen spot';
    private mnemonic2 = `lion fade special man proof bus mansion turn consider earth castle comfort
      echo axis body pen vehicle glare pig chest member fantasy brush kiwi`

    get orbitDb() {
        if (!this.isInitialized) {
            throw new Error('must be initialized first');
        }
        return this._orbitDb;
    }

    get isInitialized(): boolean {
        return !!this._orbitDb;
    }

    constructor(
        private ipfsCoreService: IpfsCoreService,
        @Inject(IpfsCoreConfigToken) private config: IpfsCoreConfig,
        private ngZone: NgZone
    ) {
        // ngZone.runOutsideAngular(() => {
        let newKey: any;
        this.ipfsCoreService.init$
            .subscribe((ipfsStatus) => {
                if (ipfsStatus) {
                    const seed = mnemonicToSeedSync(this.mnemonic2).subarray(0, 32);
                    keys.generateKeyPairFromSeed('Ed25519', seed)
                        .then((key) => {
                            console.log('key', key);
                            return {
                                publicKey: key.public.marshal(),
                                privateKey: key.marshal()
                            };
                        })
                        .then((key) => {
                            newKey = key;
                            return KeyStore();
                        })
                        .then(keystore => {
                            keystore.addKey('bob2', newKey);
                            const createConfig: {
                                ipfs: Helia,
                                id?: string,
                                keystore?: any
                            } = {ipfs: this.ipfsCoreService.helia, id: 'bob'};
                            if (config.identity?.id) {
                                createConfig.id = config.identity.id;
                            }
                            return createOrbitDB(createConfig);
                        })
                        .then((orbitdb) => {
                            this._orbitDb = orbitdb;
                            this._subject.next(true);
                        });
                }
            })
    }

    getDbCid(address: string): CID {
        if (!address.startsWith('/orbitdb') && !address.startsWith('\\orbitdb')) {
            throw new Error('not an orbitdb address');
        }

        address = address.replaceAll('/orbitdb/', '')
        address = address.replaceAll('\\orbitdb\\', '')
        address = address.replaceAll('/', '')
        address = address.replaceAll('\\', '')

        return CID.parse(address, base58btc);
    }

    async createIdentity() {
        const ids = await Identities();
        return ids.createIdentity({id: 'bob'});
    }
}

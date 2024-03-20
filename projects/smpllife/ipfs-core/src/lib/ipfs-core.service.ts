import {Inject, Injectable, signal} from '@angular/core';
import {createHelia, Helia} from "helia";
import {toObservable} from "@angular/core/rxjs-interop";
import {IDBBlockstore} from "blockstore-idb";
import {createLibp2p} from "libp2p";
import {Strings, strings} from "@helia/strings";
import {IpfsCoreConfigToken} from "./ipfs-core-config-token";
import {IpfsCoreConfig} from "./ipfs-core-config";

@Injectable({
    providedIn: 'root'
})
export class IpfsCoreService {
    private _helia?: Helia;
    private store: IDBBlockstore;

    private _initSignal = signal(!!this._helia);
    initSignal = this._initSignal.asReadonly();
    init$ = toObservable(this.initSignal);

    get helia(): Helia {
        if (!this.isInitialized) {
            throw new Error('must be initialized first');
        }
        return this._helia as Helia;
    }

    get isInitialized(): boolean {
        return this.initSignal().valueOf();
    }

    get strings(): Strings {
        return strings(this.helia);
    }

    constructor(@Inject(IpfsCoreConfigToken) private config: IpfsCoreConfig) {
        this.store = new IDBBlockstore('ipfs')
    }

    async initialize() {
        await this.store.open();
        if (this.isInitialized) return;
        await createLibp2p(this.config.libp2pConfig)
            .then(libp2p => createHelia({blockstore: this.store, libp2p}))
            .then(helia => this._helia = helia)
            .then(() => this._initSignal.set(true))
    }
}

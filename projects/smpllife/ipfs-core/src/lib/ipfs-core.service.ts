import {Inject, Injectable, NgZone, signal} from '@angular/core';
import {createHelia, Helia} from "helia";
import {toObservable} from "@angular/core/rxjs-interop";
import {IDBBlockstore} from "blockstore-idb";
import {createLibp2p} from "libp2p";
import {Strings, strings} from "@helia/strings";
import {IpfsCoreConfigToken} from "./ipfs-core-config-token";
import {IpfsCoreConfig} from "./ipfs-core-config";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class IpfsCoreService {
    private _helia?: Helia;

    private _subject = new BehaviorSubject<boolean>(false)
    init$ = this._subject.asObservable();

    get helia(): Helia {
        if (!this.isInitialized) {
            throw new Error('must be initialized first');
        }
        return this._helia as Helia;
    }

    get isInitialized(): boolean {
        return !!this._helia;
    }

    get strings(): Strings {
        return strings(this.helia);
    }

    constructor(@Inject(IpfsCoreConfigToken) private config: IpfsCoreConfig, private zone: NgZone) {
    }

    initialize() {
        // this.zone.runOutsideAngular(() => {
            const store = new IDBBlockstore('ipfs')
            if (this.isInitialized) return;
            store.open()
                .then(() => createLibp2p(this.config.libp2pConfig))
                .then(libp2p => createHelia({blockstore: store, libp2p}))
                .then(helia => this._helia = helia)
                .then(() => this._subject.next(true))
                .catch((error) => {
                    console.error('Error initializing Helia:', error);
                    this._subject.next(false);
                });
        // });
    }
}

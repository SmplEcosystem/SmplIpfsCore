import {Component, OnInit} from '@angular/core';
import {IpfsCoreService, OrbitDbCoreService} from '@smpllife/ipfs-core';
import {CID} from 'multiformats/cid';
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-add-file',
    templateUrl: './add-file.component.html',
    styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
    message?: string;
    retrievedMessage?: string;

    messageLoading = false;

    cidString?: string;

    cid?: any;

    err?: string;

    initSignal: boolean = false;
    orbitInitSignal: boolean = false;

    constructor(private ipfsCoreService: IpfsCoreService, private orbitDbCoreService: OrbitDbCoreService) {
        ipfsCoreService.initialize();
    }

    ngOnInit(): void {
        this.ipfsCoreService.init$.subscribe((status) => {
            this.initSignal = status;
        });
    }

    async save() {
        if (this.message) {
            this.retrievedMessage = undefined;
            this.cid = await this.ipfsCoreService.strings.add(this.message);
        } else {
            this.err = 'No message!'
        }
    }

    loadCid() {
        if (this.cidString) {
            this.err = undefined;
            this.cid = CID.parse(this.cidString);
        } else {
            this.err = 'cidString Empty'
        }
    }

    getMessage() {
        if (this.cid) {
            this.retrievedMessage = undefined;
            this.messageLoading = true;
            this.err = undefined
            this.ipfsCoreService.strings.get(this.cid)
                .then(retrievedString => {
                    this.messageLoading = false;
                    this.retrievedMessage = retrievedString;
                })
                .catch(e => {
                    this.err = e.toString();
                    this.messageLoading = false;
                });
        } else {
            this.err = 'cid Empty'
        }

    }

}

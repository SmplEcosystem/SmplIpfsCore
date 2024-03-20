import {Component} from '@angular/core';
import {IpfsCoreService} from '@smpllife/ipfs-core';
import {CID} from 'multiformats/cid';

@Component({
    selector: 'app-add-file',
    templateUrl: './add-file.component.html',
    styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent {
    message?: string;
    retrievedMessage?: string;

    messageLoading = false;

    cidString?: string;

    cid?: any;

    err?: string;

    initSignal = this.ipfsCoreService.initSignal;

    constructor(private ipfsCoreService: IpfsCoreService) {
        ipfsCoreService.initialize();
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

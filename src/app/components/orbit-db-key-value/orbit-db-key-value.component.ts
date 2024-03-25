import {Component, OnInit} from '@angular/core';
import {IpfsCoreService, OrbitDbCoreService} from '@smpllife/ipfs-core';
import {CID, Version} from "multiformats/cid";


@Component({
    selector: 'app-orbit-db-key-value',
    templateUrl: './orbit-db-key-value.component.html',
    styleUrls: ['./orbit-db-key-value.component.scss']
})
export class OrbitDbKeyValueComponent implements OnInit {
    private dbName = '/orbitdb/zdpuAyq6NyeXW7pt3L3gupZcB6CifMgBbvZwGxQtSDYxy7wTq';
    // private dbName = 'billy';

    orbitDb?: any;

    orbitDbName?: string;
    orbitDbCid?: CID<unknown, number, number, Version>;

    cidString?: string;

    key?: string;
    value?: string;

    orbitInitSignal: boolean = false;

    constructor(private orbitDbService: OrbitDbCoreService, private ipfsCoreService: IpfsCoreService) {
        ipfsCoreService.initialize();
    }

    async checkAndLoadContent() {
        try {
            if (!this.cidString) return null;

            const cid = CID.parse(this.cidString);
            // Check if the content is available locally
            const hasContent = await this.ipfsCoreService.helia.blockstore.has(cid);
            if (hasContent) {
                const content = await this.ipfsCoreService.helia.blockstore.get(cid);
                console.log('Content is available locally:', content);
                return content;
            }

            console.log('Content not found locally. Attempting to load from the network...');

            // Load the content from the IPFS network
            const loadedContent = await this.ipfsCoreService.helia.blockstore.get(cid);
            if (loadedContent) {
                console.log('Content loaded from the network:', loadedContent);
                return loadedContent;
            }

            console.log('Content not found on the network.');
            return null;
        } catch (error) {
            console.error('Error loading content:', error);
            return null;
        }
    }

    ngOnInit() {
        this.orbitDbService.init$
            .subscribe(
                (init) => {
                    this.orbitInitSignal = init;
                    if (init) {
                        if (!!this.orbitDbCid) return;
                        this.orbitDb = this.orbitDbService.orbitDb;
                        this.orbitDbService.orbitDb.open(
                            '/orbitdb/zdpuB1iMZ9FFk3dtrooemk7hfugixj7wTC1YCBiRf4zaNqaih',
                            {
                                type: 'keyvalue',
                                sync: true
                            }
                        )
                            .then((db: any) => {
                                this.orbitDbCid = this.orbitDbService.getDbCid(db.address);

                                this.orbitDb = db;
                                this.orbitDbName = db.address;
                            });
                    }
                }
            );


    }

    async addToDb() {
        if (this.key && this.value) {
            await this.orbitDb.put(this.key, this.value);
            this.orbitDbCid = this.orbitDbService.getDbCid(this.orbitDb.address);
            this.orbitDbName = this.orbitDb.address;
        }
    }

    dbEntries: any[] = [];

    valueOfKey?: string;
    searchKey?: string;

    async getItem() {
        this.valueOfKey = await this.orbitDb.get(this.searchKey);
    }

    readDb() {
        this.dbEntries = [];
        this.orbitDb
            .all()
            .then(
                (entries: any) => {
                    this.dbEntries = entries;
                }
            );
    }

}

import {InjectionToken} from "@angular/core";
import {IpfsCoreConfig} from "./ipfs-core-config";
import {IpfsCoreConfigDefault} from "./ipfs-core-config-default";

export const IpfsCoreConfigToken = new InjectionToken<IpfsCoreConfig>(
    'IpfsCoreConfigToken',
    {
        factory: () => IpfsCoreConfigDefault
    }
)
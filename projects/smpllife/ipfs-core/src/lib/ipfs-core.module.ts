import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IpfsCoreService} from "./ipfs-core.service";
import {IpfsCoreConfig} from "./ipfs-core-config";
import {merge} from "lodash-es";
import {IpfsCoreConfigDefault} from "./ipfs-core-config-default";
import {IpfsCoreConfigToken} from "./ipfs-core-config-token";

function initializeHelia(ipfsCoreService: IpfsCoreService) {
  return () => ipfsCoreService.initialize()
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeHelia,
      deps: [IpfsCoreService],
      multi: true
    }
  ]
})
export class IpfsCoreModule {
  static forRoot(config?: IpfsCoreConfig) {
    const ngModule: ModuleWithProviders<IpfsCoreModule> = {
      ngModule: IpfsCoreModule
    };
    if (config) {
      ngModule.providers = [{
        provide: IpfsCoreConfigToken, useValue: merge(IpfsCoreConfigDefault, config)
      }];
    }
    return ngModule;
  }
}

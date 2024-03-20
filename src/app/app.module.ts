import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddFileComponent} from "./add-file/add-file.component";
import {IpfsCoreModule} from "@smpllife/ipfs-core";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";

@NgModule({
    declarations: [
        AppComponent,
        AddFileComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IpfsCoreModule.forRoot(),
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

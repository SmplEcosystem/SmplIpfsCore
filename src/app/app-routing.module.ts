import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AddFileComponent} from "./add-file/add-file.component";
import {OrbitDbKeyValueComponent} from "./components/orbit-db-key-value/orbit-db-key-value.component";

export const routes: Routes = [
    {
        path: '', component: HomeComponent, data: {name: 'Home'}
    },
    {
        path: 'add', component: AddFileComponent, data: {name: 'Add File'}
    },
    {
        path: 'keyvalue', component: OrbitDbKeyValueComponent, data: {name: 'OrbitDB Key-Value'}
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

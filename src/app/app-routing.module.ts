import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AddFileComponent} from "./add-file/add-file.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'add', component: AddFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

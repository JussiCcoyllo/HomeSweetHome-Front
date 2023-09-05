import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddPropertyComponent} from "./components/add-property/add-property.component";
import {DeletePropertyComponent} from "./components/delete-property/delete-property.component";
import {UpdatePropertyComponent} from "./components/update-property/update-property.component";
import {AdminComponent} from "./admin.component";

const routes: Routes = [
  {path:'',component: AdminComponent},
  {path: 'add-property', component:AddPropertyComponent},
  {path: 'delete-property/:id', component:DeletePropertyComponent},
  {path: 'update-property/:id', component:UpdatePropertyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

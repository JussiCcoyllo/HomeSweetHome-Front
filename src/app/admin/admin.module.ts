import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { UpdatePropertyComponent } from './components/update-property/update-property.component';
import { DeletePropertyComponent } from './components/delete-property/delete-property.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminService} from "../shared/services/admin.service";


@NgModule({
  declarations: [
    AddPropertyComponent,
    UpdatePropertyComponent,
    DeletePropertyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers:[
    AdminService
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SupplierComponent} from "./supplier/supplier.component";
import {TenantComponent} from "./tenant/tenant.component";

const routes: Routes = [
  {path:'admin', loadChildren:()=>import('./admin/admin.module').then(a=>a.AdminModule)},
  {path:'landing', component: LandingPageComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'supplier', component: SupplierComponent},
  {path:'tenant', component: TenantComponent},
  {path:'', redirectTo: 'landing',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

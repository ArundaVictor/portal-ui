import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';


const routes: Routes = [
 {
   path: "",
   redirectTo: "user",
   pathMatch: "full",
  
 },
 {
   path: "",
   component: UserComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

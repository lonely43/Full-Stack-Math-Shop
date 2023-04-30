import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListItemsComponent } from './list-items/list-items.component';
import { PayPageComponent } from './pay-page/pay-page.component';

const routes: Routes = [
  { path: "", component: ListItemsComponent },
  { path: "pay", component: PayPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { AppService } from './app.service';
import { PayPageComponent } from './pay-page/pay-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ListItemsComponent,
    PayPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule { }

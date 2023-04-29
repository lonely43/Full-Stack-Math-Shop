import { Component } from '@angular/core';
import { ItemsDTO } from './item.model';
import { AppService } from '../app.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent {
  items: ItemsDTO[];

  constructor(private appService: AppService, private appComponent: AppComponent) {
    this.items = appService.getItems()
  }
  addToCartOne(id: number){
   // localStorage.setItem("cart", JSON.stringify([...JSON.parse(localStorage.getItem("cart")?? "[]"), id]))
    this.appComponent.addToCartOne(id)
    this.appComponent.updateLocalCart()
  }
}
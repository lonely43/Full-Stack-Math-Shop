import { Component, AfterViewInit } from '@angular/core';
import { ItemsDTO } from '../list-items/item.model';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.scss']
})
export class PayPageComponent implements AfterViewInit {
  constructor(private appComponent: AppComponent){
  }

  items: ItemsDTO[] = this.appComponent.items

  ngAfterViewInit(): void {
    this.updateItems()
  }

  updateItems(){
    this.items = this.appComponent.items
  }
  addOne(id: number){
    return this.appComponent.addToCartOne(id)
  }
  minOne(id: number){
    return this.appComponent.minToCartOne(id)
  }
  removeItem(id: number, element){
    return this.appComponent.removeFromCart(id, element)
  }
}

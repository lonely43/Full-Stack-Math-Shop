import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocalItemsDTO } from './list-items/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  itemsLocal: LocalItemsDTO[];

  @ViewChild("cart") cart: ElementRef
  showCart(){
    console.log(this.cart)
    this.cart.nativeElement.classList.toggle("showCart")
  }
}

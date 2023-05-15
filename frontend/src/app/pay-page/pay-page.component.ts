import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ItemsDTO, LocalValues } from '../list-items/item.model';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.component.html',
  styleUrls: ['./pay-page.component.scss']
})
export class PayPageComponent implements AfterViewInit {
  constructor(private appService: AppService, private appComponent: AppComponent){
  }

  items: ItemsDTO[];
  values: LocalValues[];
  totalPrice: number;

  @ViewChild("pay") mainPay: ElementRef;
  @ViewChild("ops") opsText: ElementRef;

  ngAfterViewInit(): void {
    this.updateItems()
  }

  async updateItems(){
    this.values = JSON.parse(localStorage.getItem("cart"))
    //this.items = this.values.map(i => this.appService.findOne(i.id, i.amount))
    this.items.map(i => i.totalPrice = i.price * i.amount)
 
    //let totalpriceArray: number[] = this.values.map(i => i.amount * this.appService.findOne(i.id, i.amount).price)
    //this.totalPrice = totalpriceArray.reduce((a, b) => a + b, 0)

    if(!this.values || this.values.length <= 0 || this.values == null){
      this.mainPay.nativeElement.style.display = "none"
      this.opsText.nativeElement.style.display = "flex"
    }
    else{
      this.mainPay.nativeElement.style.display = "flex"
      this.opsText.nativeElement.style.display = "none"
    }
  }

  async addOne(id: number){
    await this.appComponent.addToCartOne(id)
    return this.updateItems()
  }

  async minOne(id: number){
    await this.appComponent.minToCartOne(id)
    return this.updateItems() 
  }
  
  async removeItem(id: number, element){
    await this.appComponent.removeFromCart(id, element, false)
    return this.updateItems()
  }
}

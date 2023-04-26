import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItemsDTO } from './list-items/item.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private appService: AppService){}
  items: ItemsDTO[];
  values: number[];
  voidCart: string = null;

  ngOnInit(): void {
    this.updateLocalCart()
  }

  updateLocalCart(){
    this.values = JSON.parse(localStorage.getItem("cart"))
    if(!this.values || this.values.length <= 0){
      console.log(1)
      this.voidCart = "You didn't choose anything"
    }
    else{
      this.voidCart = ""
    }
    this.items = this.values.map(i => this.appService.getOne(i))
  }

  addToCartOne(id: number){
    this.values.push(id)
    localStorage.setItem("cart", JSON.stringify(this.values))
    this.updateLocalCart()
  }

  minToCartOne(id: number){
    const index = this.values.findIndex(i => i === id)
    this.values = this.values.filter((_ , i) => i !== index)
    localStorage.setItem("cart", JSON.stringify(this.values))
    this.updateLocalCart()
  }

  @ViewChild("cart") cart: ElementRef
  showCart(){
    console.log(this.cart)
    this.cart.nativeElement.classList.toggle("showCart")
  }
}
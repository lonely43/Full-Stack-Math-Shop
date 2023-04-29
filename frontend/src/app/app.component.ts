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
      this.voidCart = "You didn't choose anything"
    }
    else{
      this.voidCart = null
    }
    this.items = this.values.map(i => this.appService.getOne(i))
  }

  addToCartOne(id: number){
    if(this.values.some(ids => ids == id))
    {
      this.items.filter(i =>{ 
        if(i.id == id)
          {
            i.amount += 1
          }})
    }
    else{
      this.values.push(id)
      localStorage.setItem("cart", JSON.stringify(this.values))
    }
    this.updateLocalCart()
  }

  minToCartOne(id: number){
    const item = this.items.find(e => e.id == id)
    if(
      item.amount <= 0
    ){
      const index = this.values.findIndex(i => i === id)
      this.values = this.values.filter((_ , i) => i !== index)
      localStorage.setItem("cart", JSON.stringify(this.values))
    }
    else{
      this.items.map(item => { if(item.id == id){item.amount -= 1} })
    }
    this.updateLocalCart()
  }

  @ViewChild("cart") cart: ElementRef
  showCart(){
    this.cart.nativeElement.classList.toggle("showCart")
  }
}
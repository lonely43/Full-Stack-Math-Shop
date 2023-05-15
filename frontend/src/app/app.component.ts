import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ItemsDTO, LocalValues } from './list-items/item.model';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  @ViewChild("cartBtn") cartBtn: ElementRef;
  constructor(private appService: AppService, private router: Router){
    router.events.subscribe(val => {
      if(val && router.url == "/pay"){
        this.cartBtn.nativeElement.style.display = "none"
        this.cart.nativeElement.style.display = "none"
      }
      else{
        this.cartBtn.nativeElement.style.display = "flex"
        this.cart.nativeElement.style.display = "flex"
      }
    })
  }

  items: any;
  values: LocalValues[];

  totalPrice: number;
  displayItemCart: string;
  amountItemsInCart: number;

  voidCart: string = null;
  @ViewChild("payBtn") payButton: ElementRef

  @ViewChild("cart") cart: ElementRef

  ngAfterViewInit(){
    if(!localStorage.getItem("cart")){
      localStorage.setItem("cart", "[]")
    }
    this.updateLocalCart()
  }

  async updateLocalCart(){
    this.values = JSON.parse(localStorage.getItem("cart"))
    this.items = await Promise.all(this.values.map(i => lastValueFrom(this.appService.findOne(i.id))))
    this.values.forEach((i,_) => this.items[_].amount = i.amount)
    
    //let totalpriceArray: number[] = this.values.map(i => i.amount * this.appService.findOne(i.id).price)
    //this.totalPrice = totalpriceArray.reduce((a, b) => a + b, 0)
    
    if(!this.values || this.values.length <= 0 || this.values == null){
      this.voidCart = "You chose nothing"
      this.payButton.nativeElement.style.display = "none"
    }
    else{
      this.voidCart = null
      this.payButton.nativeElement.style.display = "flex"
    }


    this.amountItemsInCart = this.values.length
    if(this.amountItemsInCart == 0 || null)
    {
      this.displayItemCart = "none"
    }
    else{
      this.displayItemCart = "flex"
    }
  }

  addToCartOne(id: number){
    const index = this.values.findIndex(i => i.id === id)
    console.log(index)
    if(index !== -1)
    {
      this.values[index].amount += 1
      console.log(this.values[index])
      localStorage.setItem("cart", JSON.stringify(this.values))
    }
    else{
      const item = {id: id, amount: 1}
      this.values.push(item)
      localStorage.setItem("cart", JSON.stringify(this.values))
    }
    this.updateLocalCart()
  }

  async minToCartOne(id: number){
    const item = this.items.find(e => e.id == id)
    if(item.amount > 1){
      this.values.map(i => { if(i.id == id){i.amount -= 1} })
      localStorage.setItem("cart", JSON.stringify(this.values))
    }
    this.updateLocalCart()
  }

  async removeFromCart(id: number, element: any, anim: boolean = true){
    if(anim)
    {
      await element.parentNode.parentNode.parentNode.parentNode.classList.add("hideItem")
    }
    else{
      const index = this.values.findIndex(i => i.id === id)
      this.values = this.values.filter((_ , i) => i !== index)
      localStorage.setItem("cart", JSON.stringify(this.values))
      return this.updateLocalCart()
    }

    setTimeout(() => {
      const index = this.values.findIndex(i => i.id === id)
      this.values = this.values.filter((_ , i) => i !== index)
      localStorage.setItem("cart", JSON.stringify(this.values))
      this.updateLocalCart()
    }, 250);
  }

  showCart(){
    this.cart.nativeElement.classList.toggle("showCart")
  }
}
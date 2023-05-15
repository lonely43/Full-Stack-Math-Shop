import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LocalValues } from './list-items/item.model';
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

  items: any[];
  values: LocalValues[];

  totalPrice: number;
  displayItemCart: string;
  amountItemsInCart: number;

  voidCart: string = null;
  @ViewChild("payBtn") payButton: ElementRef
  @ViewChild("cart") cart: ElementRef

  async ngAfterViewInit(){
    if(!localStorage.getItem("cart")){
      localStorage.setItem("cart", "[]")
    }
    await this.updateCartGlobal()
    this.update()
  }

  async addToCartOne(id: number){
    const index = this.values.findIndex(i => i.id === id)
    if(index !== -1)
    {
      this.values[index].amount += 1
      localStorage.setItem("cart", JSON.stringify(this.values))
    }
    else{
      const value = {id: id, amount: 1}
      this.values.push(value)
      let newItem = await lastValueFrom(this.appService.findOne(value.id))
      this.items.push(newItem)
      localStorage.setItem("cart", JSON.stringify(this.values))
    }
    this.update()
  }

  async minToCartOne(id: number){
    const item = this.items.find(e => e.id == id)
    if(item.amount > 1){
      this.values.map(i => { if(i.id == id){i.amount -= 1} })
      localStorage.setItem("cart", JSON.stringify(this.values))
    }
    this.update()
  }

  async removeFromCart(id: number, element: any, anim: boolean = true){
    if(anim)
    {
      await element.parentNode.parentNode.parentNode.parentNode.classList.add("hideItem")
    }
    else{
      this.appService.deleteById(id)
      this.update()
    }

    setTimeout(async () => {
      const index = this.values.findIndex(i => i.id === id)
      this.values = this.values.filter((_ , i) => i !== index)
      localStorage.setItem("cart", JSON.stringify(this.values))
      this.items.splice(index, 1)
      this.update()
    }, 250);
  }

  showCart(){
    this.cart.nativeElement.classList.toggle("showCart")
  }

  
  async updateCartGlobal(){
    this.items = await this.appService.getItems()
  }
  update(){
    this.values = JSON.parse(localStorage.getItem("cart"))
    this.values.forEach((i, _) => this.items[_].amount = i.amount)
  
    let totalpriceArray: number[] = this.items.map(i => i.amount*i.price)
    this.totalPrice = totalpriceArray.reduce((a, b) => a + b, 0)
  
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
}
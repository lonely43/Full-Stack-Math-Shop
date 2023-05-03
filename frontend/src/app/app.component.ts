import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ItemsDTO, LocalValues } from './list-items/item.model';
import { AppService } from './app.service';
import { Router } from '@angular/router';

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
  
  items: ItemsDTO[];
  values: LocalValues[];

  totalPrice: number;
  displayItemCart: string;
  amountItemsInCart: number;

  voidCart: string = null;
  @ViewChild("payBtn") payButton: ElementRef

  @ViewChild("cart") cart: ElementRef

  ngAfterViewInit(): void {
    window.addEventListener("storage", () => console.log(1))
    this.updateLocalCart()
  }

  updateLocalCart(){
    this.values = JSON.parse(localStorage.getItem("cart"))
    this.items = this.values.map(i => this.appService.getOne(i.id, i.amount))

    let totalpriceArray: number[] = this.values.map(i => i.amount * this.appService.getOne(i.id, i.amount).price)
    this.totalPrice = totalpriceArray.reduce((a, b) => a + b, 0)
    
    if(!this.values || this.values.length <= 0){
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
    if(this.values.some(i => i.id == id))
    {
      this.values.filter(i =>{ 
        if(i.id == id)
          {
            i.amount += 1
          }})
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

  async removeFromCart(id: number, element: any){
    await element.parentNode.parentNode.parentNode.parentNode.classList.add("hideItem")

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
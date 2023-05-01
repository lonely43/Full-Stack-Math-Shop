import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItemsDTO, LocalValues } from './list-items/item.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  constructor(private appService: AppService){}
  items: ItemsDTO[];
  values: LocalValues[];

  amountItemsInCart: number;
  displayItemCart: string;

  voidCart: string = null;

  @ViewChild("payBtn") payButton: ElementRef


  ngAfterViewInit(): void {
    this.updateLocalCart()
  }

  updateLocalCart(){
    this.values = JSON.parse(localStorage.getItem("cart"))
    this.items = this.values.map(i => this.appService.getOne(i.id, i.amount))
    
    if(!this.values || this.values.length <= 0){
      this.voidCart = "You didn't choose anything"
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
      setTimeout
      const item = {id: id, amount: 0}
      this.values.push(item)
      localStorage.setItem("cart", JSON.stringify(this.values))
    }
    this.updateLocalCart()
  }

  async minToCartOne(id: number, element){
    const item = this.items.find(e => e.id == id)
    if(item.amount <= 0){
        await element.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add("hideItem")

      setTimeout(() => {
        const index = this.values.findIndex(i => i.id === id)
        this.values = this.values.filter((_ , i) => i !== index)
        localStorage.setItem("cart", JSON.stringify(this.values))
        this.updateLocalCart()
      }, 250);
    }
    else{
      this.values.map(i => { if(i.id == id){i.amount -= 1} })
      localStorage.setItem("cart", JSON.stringify(this.values))
    }
    this.updateLocalCart()
  }

  @ViewChild("cart") cart: ElementRef
  showCart(){
    this.cart.nativeElement.classList.toggle("showCart")
  }
}
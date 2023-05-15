import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalValues } from './list-items/item.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient){}
  values: LocalValues[];
  items:any[]

  findAll(){
    return this.http.get('http://localhost:3000/items/findAll')
  }
  
  findOne(id: number){
    return this.http.get(`http://localhost:3000/items/findOne/${id}`)
  }

  async getItems(){
    this.values = JSON.parse(localStorage.getItem("cart"))
    this.items = await Promise.all(this.values.map(i => lastValueFrom(this.findOne(i.id))))
    this.values.forEach((i, _) => this.items[_].amount = i.amount)
    return this.items
  }

  async deleteById(id: number){
    const index = this.values.findIndex(i => i.id === id)
    this.values.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(this.values))
  }
}

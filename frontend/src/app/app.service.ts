import { Injectable } from '@angular/core';
import { ItemsDTO } from './list-items/item.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  items: ItemsDTO[] = [
    {
      id: 1,
      title: "Triangle",
      description: "Very interesting and cool triangle",
      icon: "triangle.png",
      amount: 0,
      price: 10,
    },
    {
      id: 2,
      title: "Snake",
      description: "beautiful snake",
      icon: "triangle.png",
      amount: 0,
      price: 5,
    },
    {
      id: 3,
      title: "Plant",
      description: "Impossible plant",
      icon: "triangle.png",
      amount: 0,
      price: 15,
    },
    {
      id: 4,
      title: "Pig",
      description: "Cool Pig",
      icon: "triangle.png",
      amount: 0,
      price: 4,
    },
    {
      id: 5,
      title: "Cube",
      description: "Very interesting cube",
      icon: "triangle.png",
      amount: 0,
      price: 32,
    },
    {
      id: 6,
      title: "Box",
      description: "Very cool box",
      icon: "triangle.png",
      amount: 0,
      price: 2,
    },
  ]

  getItems(){
    return this.items
  }
  
  getOne(id: number, amount:number){
    let item = this.items.find((e) => e.id === id)
    item.amount = amount
    return item
  }
}

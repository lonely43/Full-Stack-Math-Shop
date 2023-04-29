import { Injectable } from '@angular/core';
import { ItemsDTO } from './list-items/item.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  items: ItemsDTO[] = [
    {
      id: 1,
      title: "triangle",
      description: "Very interesting and cool triangle",
      icon: "triangle.png",
      amount: 0
    },
    {
      id: 2,
      title: "Snake",
      description: "beautiful snake",
      icon: "triangle.png",
      amount: 0
    },
    {
      id: 3,
      title: "Plant",
      description: "Impossible plant",
      icon: "triangle.png",
      amount: 0
    },
    {
      id: 4,
      title: "Pig",
      description: "Cool Pig",
      icon: "triangle.png",
      amount: 0
    },
    {
      id: 5,
      title: "Cube",
      description: "Very interesting cube",
      icon: "triangle.png",
      amount: 0
    },
    {
      id: 6,
      title: "Box",
      description: "Very cool box",
      icon: "triangle.png",
      amount: 0
    },
  ]

  getItems(){
    return this.items
  }
  
  getOne(id: number){
    return this.items.find((e) => e.id === id)
  }
}

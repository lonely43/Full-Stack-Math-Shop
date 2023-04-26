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
      icon: "triangle.png"
    },
    {
      id: 2,
      title: "Snake",
      description: "beautiful snake",
      icon: "triangle.png"
    },
    {
      id: 3,
      title: "Plant",
      description: "Impossible plant",
      icon: "triangle.png"
    },
    {
      id: 4,
      title: "Pig",
      description: "Cool Pig",
      icon: "triangle.png"
    },
    {
      id: 5,
      title: "Cube",
      description: "Very interesting cube",
      icon: "triangle.png"
    },
    {
      id: 6,
      title: "Box",
      description: "Very cool box",
      icon: "triangle.png"
    },
  ]

  getItems(){
    return this.items
  }
  
  getOne(id: number){
    return this.items.find((e) => e.id === id)
  }
}

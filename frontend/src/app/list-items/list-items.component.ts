import { Component } from '@angular/core';
import { ItemsDTO } from './item.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent {
  items: ItemsDTO[] = [
    {
      title: "triangle",
      description: "Very interesting and cool triangle",
      icon: "triangle.png"
    },
    {
      title: "triangle",
      description: "Very interesting and cool triangle",
      icon: "triangle.png"
    },
    {
      title: "triangle",
      description: "Very interesting and cool triangle",
      icon: "triangle.png"
    },
    {
      title: "triangle",
      description: "Very interesting and cool triangle",
      icon: "triangle.png"
    },
    {
      title: "triangle",
      description: "Very interesting and cool triangle",
      icon: "triangle.png"
    },
    {
      title: "triangle",
      description: "Very interesting and cool triangle",
      icon: "triangle.png"
    },
    
  ]
}

import { AfterViewInit, Component } from '@angular/core';
import { AppService } from '../app.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements AfterViewInit {
  items: any

  constructor(private appService: AppService, private appComponent: AppComponent) {}

  ngAfterViewInit(){
    this.appService.findAll().subscribe(data => this.items = data);
  }

  addToCartOne(id: number){
    this.appComponent.addToCartOne(id)
  }
}
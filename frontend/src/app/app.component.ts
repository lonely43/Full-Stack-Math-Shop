import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  count: number = 0

  addCount(){
    this.count = this.count + 1
  }
  minCount(){
    if(this.count > 0){
      this.count = this.count - 1
    }
  }
}

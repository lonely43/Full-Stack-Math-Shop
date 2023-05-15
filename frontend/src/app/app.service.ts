import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient){}

  findAll(){
    return this.http.get('http://localhost:3000/items/findAll')
  }
  
  findOne(id: number){
    return this.http.get(`http://localhost:3000/items/findOne/${id}`)
  }
}

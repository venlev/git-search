import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'git-search';
  queryResults: object[];

  constructor(private api: ApiService){
  
  }

  ngOnInit(){
    this.api.data.subscribe(res =>{
      this.queryResults = res["items"];
    })
  }
}

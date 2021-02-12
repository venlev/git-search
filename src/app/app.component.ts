import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'git-search';
  queryResults: object[];

  constructor(private api: ApiService){
    api.result.subscribe(res =>{
      this.queryResults = res["items"];
      console.log(this.queryResults);
    })

    api.requestData('string');
  }

  ngOnInit(){

  }
}

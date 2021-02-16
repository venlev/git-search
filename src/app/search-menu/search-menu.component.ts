import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.css']
})
export class SearchMenuComponent implements OnInit {
  query: string;
  api: ApiService;
  amountOfResults: number = 0;

  constructor(api: ApiService) {
    this.api = api;

    this.api.result.subscribe(res => {
      this.amountOfResults = res["total_count"];
    });
  }

  queryGit(){
    this.api.requestData(this.query);
    this.query = '';
  }

  ngOnInit(): void {
    
  }

}

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
  amountOfResults: number;

  constructor(private api: ApiService) {
    this.api.data.subscribe(allData=>{
      this.amountOfResults = allData['total_count']
    })
  }

  queryGit(event){
    this.api.requestData(event.target.value)
    event.target.value = '';
  }

  ngOnInit(): void {
  }

}

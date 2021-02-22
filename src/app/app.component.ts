import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from './services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

let cooldown = true;
let isNext: BehaviorSubject<boolean> = new BehaviorSubject(false);

window.addEventListener('scroll', ()=>{
  let scrollTop = window.scrollY;
  let docHeight = document.body.offsetHeight;
  let winHeight = window.innerHeight;
  let scrollPercent = scrollTop / (docHeight - winHeight);
  let scrollPercentRounded = Math.round(scrollPercent * 100);

  if(scrollPercentRounded === 100 && cooldown){
    AppComponent.nextPage();
    cooldown = false;
    setTimeout(()=>{
      cooldown = true;
    }, 1000)
  }
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'git-search';
  queryResults: object[];
  isQueried: boolean;
  searchIco = faSearch;
  

  constructor(private api: ApiService, private renderer2: Renderer2) {
    api.isQueried.subscribe(ans=>{
      this.isQueried = ans;
    })
  }
  
  static nextPage(){
    console.log('next');
    isNext.next(true);
  }

  ngOnInit() {
    this.api.items.subscribe(res => {
      this.queryResults = res;
      console.log(res)
    })

    isNext.subscribe(response=>{
      if(response) this.api.nextPage();
    })
  }
}

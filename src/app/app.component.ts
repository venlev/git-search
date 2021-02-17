import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { ApiService } from './services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'git-search';
  queryResults: object[];
  fixedBoxOffsetTop: number = 0;
  fixedBoxOffsetTopOtherMethod: number = 0;
  listener
  /*
  @ViewChild('contentbox') contentList: ElementRef;
  

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const rect = this.contentList.nativeElement.getBoundingClientRect();
    this.fixedBoxOffsetTop = rect.top + window.pageYOffset - document.documentElement.clientTop;

    
  }
  */

  constructor(private api: ApiService, private renderer2: Renderer2) {
    this.listener = this.renderer2.listen('window', 'scroll', (e) => {
      console.log(this.getYPosition(e));
    });
  }

  getYPosition(e: Event): any {
    return (e.target as Element).scrollTop;
  }

  ngOnDestroy(): void {
    this.listener();
  }

  ngOnInit() {
    this.api.data.subscribe(res => {
      this.queryResults = res["items"];
    })
  }
}

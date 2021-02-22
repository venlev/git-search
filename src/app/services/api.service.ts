import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, switchMap, catchError, map } from "rxjs/operators";
import { fromFetch } from 'rxjs/fetch';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ApiService {

  private data$: BehaviorSubject<object> = new BehaviorSubject({});
  private items$: BehaviorSubject<object[]> = new BehaviorSubject([]);
  private results$: BehaviorSubject<number> = new BehaviorSubject(0);
  private isQuery$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private page: number = 1;
  private oldQuery: string;
  private accumulator: object[];

  get items(): Observable<object[]>{
    return this.items$.asObservable();
  }

  get data(): Observable<object> {
    return this.data$.asObservable();
  }

  get isQueried(): Observable<boolean> {
    return this.isQuery$.asObservable();
  }


  constructor(private http: HttpClient) {

  }

  requestData(query: string, paging?:string) {
    this.oldQuery = query;
    let pagination = typeof paging !== 'undefined' ? paging : '';
    this.isQuery$.next(true);
    console.log(typeof paging, paging)
    //console.log(`https://api.github.com/search/repositories?q=${query}${pagination}`)
    //&sort=stars&order=desc&page=1
    this.http.get(`https://api.github.com/search/repositories?q=${query}${pagination}&per_page=10`).pipe(
      catchError(err => {
        return of({ error: true, message: err.message })
      })
    ).subscribe(r => 
      {
        //this.data$.next(r);
        if(typeof this.accumulator === "undefined"){
          console.log('acc create')
          this.items$.next(r['items']);
          this.accumulator = r['items'];
        } else {
          console.log('acc append')
          this.items$.next([...this.accumulator, ...r['items']]);
        }
        
      })

  }

  nextPage() {
    //if (typeof this.page !== "undefined") this.page = 1;
    let paging = `?page=${this.page}`;
    this.requestData(this.oldQuery, paging);
    this.page ++;
  }
}

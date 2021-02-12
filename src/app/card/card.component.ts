import { Component, Input, OnInit } from '@angular/core';
import { faCodeBranch, faStar, faClipboardList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() data: object;
  fork = faCodeBranch;
  star = faStar;
  issues = faClipboardList;


  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}

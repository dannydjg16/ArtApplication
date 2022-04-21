import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-artwork-card',
  templateUrl: './user-artwork-card.component.html',
  styleUrls: ['./user-artwork-card.component.css']
})
export class UserArtworkCardComponent implements OnInit {

  @Input() theArtwork : any;
  @Input() theUser: any;
  @Input() liked: any;

  constructor() { }

  ngOnInit(): void {
  }

}

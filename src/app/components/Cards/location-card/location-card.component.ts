import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent implements OnInit {

  @Input() theLocation : any;
  @Input() liked: any;

  constructor() {
    // Intentionally Empty
   }

  ngOnInit(): void {
    // Intentionally Empty
  }

}



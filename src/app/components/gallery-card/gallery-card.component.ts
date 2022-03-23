import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css']
})
export class GalleryCardComponent implements OnInit {

  @Input() theArtwork : any;

  constructor() { }

  ngOnInit(): void {
  }

}

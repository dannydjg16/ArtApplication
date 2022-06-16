import { Component, Input, OnInit } from '@angular/core';
import Artwork from 'src/app/interfaces/artwork';
import User from 'src/app/interfaces/user';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css']
})
export class GalleryCardComponent implements OnInit {

  @Input() theArtwork : any;
  @Input() theUser!: User;
  @Input() liked: any;
  @Input() usersLikes!: Artwork[];
  hasUserLiked!: boolean;

  constructor() { }

  ngOnInit(): void {

  }
}

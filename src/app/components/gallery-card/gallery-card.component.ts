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
    // if (this.theUser.likes?.length) {
    //   for (var i=0; i<=this.theUser.likes!.length; i++) {
    //     if (this.theUser.likes[i].artId == this.theArtwork.id) {
    //       this.hasUserLiked = true;
    //     }
    //   }
    // }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import Artwork from 'src/app/interfaces/artwork';
import User from 'src/app/interfaces/user';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.css']
})
export class PostActionsComponent implements OnInit {

  @Input() theArtwork : any;
  @Input() theUser : any;
  @Input() liked: any;

  constructor(private _likeService: LikeService) { }

  ngOnInit(): void {
  }

  public LikePost(art: Artwork, user: User) {
    this._likeService.likePost(art.id, user.id).subscribe(data => {
      console.log(data);
    });
  }

  public UnlikePost(art: Artwork, user: User) {
    this._likeService.likePost(art.id, user.id).subscribe(data => {
      console.log(data);
    });
  }
}

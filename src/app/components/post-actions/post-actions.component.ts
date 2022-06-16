import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Artwork from 'src/app/interfaces/artwork';
import User from 'src/app/interfaces/user';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.css']
})
export class PostActionsComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;

  @Input() theArtwork! : Artwork;
  @Input() theUser : any;
  @Input() liked: any;

  constructor(private _likeService: LikeService) { }

  ngOnInit(): void {
  }

  public LikePost(art: Artwork, user: User) {
    this._likeService.likePost(art.id, user.id).subscribe(data => {
      window.location.reload();
      console.log(data);
    });
  }

  public UnlikePost(art: Artwork, user: User) {
    this._likeService.unlikePost(art.id, user.id).subscribe(data => {
      window.location.reload();
      console.log(data);
    });
  }
}

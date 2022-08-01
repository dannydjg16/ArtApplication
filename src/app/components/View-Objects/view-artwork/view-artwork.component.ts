import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import Artwork from 'src/app/interfaces/artwork';
import User from 'src/app/interfaces/user';
import { ArtworkService } from 'src/app/services/artwork.service';
import { LikeService } from 'src/app/services/like.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-artwork',
  templateUrl: './view-artwork.component.html',
  styleUrls: ['./view-artwork.component.css']
})
export class ViewArtworkComponent implements OnInit {

  public user!: User;
  artwork!: Artwork
  public artworkPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";
  hasUserLiked!: boolean;

  constructor(private userService: UserService,
    private _oktaStateService: OktaAuthStateService,
    private route: ActivatedRoute,
    private _artworkService: ArtworkService,
    private _likeService: LikeService) { }

  ngOnInit(): void {
    this._oktaStateService.authState$
      .subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!)
        .subscribe(user => this.setArtworkAndUser(user)));
  }

  setArtworkAndUser(user: User) {
    this.user = user
    this._artworkService.getFullArtworkById(this.route.snapshot.params['id'])
      .subscribe({
        next: artwork => this.setArtworkAndUrl(artwork),
        error: () => null,
        complete: () => this.checkIfUserLiked()
      })   
  }

  checkIfUserLiked() {
    if (this.user.likes?.length) {
      for (let i = 0; i <= this.user.likes!.length-1; i++) {
          if (this.user.likes[i].artId == this.artwork.id) {
            this.hasUserLiked = true;
          }
      }
    }
  }

  setArtworkAndUrl(artwork: Artwork) {
    this.artwork = artwork;
    this.artworkPictureURL = artwork.fileName;
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

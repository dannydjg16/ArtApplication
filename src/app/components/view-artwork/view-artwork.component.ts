import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import Artwork from 'src/app/interfaces/artwork';
import User from 'src/app/interfaces/user';
import { ArtworkService } from 'src/app/services/artwork.service';
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


  constructor(private userService: UserService,
    private _oktaStateService: OktaAuthStateService,
    private route: ActivatedRoute,
    private _artworkService: ArtworkService) { }

  ngOnInit(): void {
    this._oktaStateService.authState$
      .subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!)
        .subscribe(user => this.setArtworkAndUser(user)));
  }

  setArtworkAndUser(user: User) {
    this.user = user
    this._artworkService.getArtworkById(this.route.snapshot.params['id'])
      .subscribe(artwork => this.setArtworkAndUrl(artwork));
  }

  setArtworkAndUrl(artwork: Artwork) {
    this.artwork = artwork;
    this.artworkPictureURL = artwork.fileName;
  }

}

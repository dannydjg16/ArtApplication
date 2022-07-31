import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import Artist from 'src/app/interfaces/artist';
import User from 'src/app/interfaces/user';
import { ArtistService } from 'src/app/services/artist.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-artist',
  templateUrl: './view-artist.component.html',
  styleUrls: ['./view-artist.component.css']
})
export class ViewArtistComponent implements OnInit {

  public user!: User;
  public artistPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";
  public viewArtist!: Artist;
  public userAddedArtist!: boolean;

  constructor(private userService: UserService,
    private _oktaStateService: OktaAuthStateService,
    private _artistService: ArtistService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._oktaStateService.authState$
      .subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!)
        .subscribe(u => this.setArtistAndUser(u)));
  }

  setArtistAndUser(user: User) {
    this.user = user;
    this._artistService.getAnArtist(this.route.snapshot.params['id']).subscribe(artist => this.setArtistAndURL(artist));
  }

  setArtistAndURL(artist: Artist) {
    this.viewArtist = artist;
    this.artistPictureURL = artist.pictureURL;
    this.isUserTheAdder(this.user, this.viewArtist);
  }

  isUserTheAdder(user: User, artist: Artist) {
    if (user.id === artist.artistAdderId) {
      this.userAddedArtist = true;
    } else {
      this.userAddedArtist = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private userService: UserService, 
              private _oktaStateService: OktaAuthStateService,
              private _artistService: ArtistService,
              private route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit(): void {
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user = u));
 
    this._artistService.getAnArtist(this.route.snapshot.params['id']).subscribe(artist => this.setArtistAndURL(artist));
  }

  setArtistAndURL(artist: Artist) {
    this.viewArtist = artist;
    this.artistPictureURL = artist.pictureURL;
  }
}

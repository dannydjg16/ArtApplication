import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artist from 'src/app/interfaces/artist';
import User from 'src/app/interfaces/user';
import { ArtistService } from 'src/app/services/artist.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {

  public user!: User;
  public isAuthenticated$!: Observable<boolean>;
  public artistPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";
  public artist!: Artist;

  constructor(private _oktaStateService: OktaAuthStateService, 
              private _artistService: ArtistService,
              private _userService: UserService,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this._oktaStateService.authState$.subscribe(as => this._userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user = u));
    
    this._artistService.getAnArtist(this.route.snapshot.params['id']).subscribe(artist => this.artist = artist);
  }

  edit(name: string, url: string, bornLocation: string, born: string, died: string, biography: string) {
    const artist = {
      name: name, pictureURL: url, bornLocation: bornLocation, born: born, died: died, biography: biography
    }

    this._artistService.editArtist(artist as unknown as Artist).subscribe(data => {
      console.log(data);
    });
  }

  setArtworkAndURL(artist: Artist) {
    this.artist = artist;
    this.artistPictureURL = artist.pictureURL;
  }

  updateArtistPicture(url: string) {
    this.artistPictureURL = url;
  }
}

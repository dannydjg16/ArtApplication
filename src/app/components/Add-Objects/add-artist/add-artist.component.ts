import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artist from 'src/app/interfaces/artist';
import User from 'src/app/interfaces/user';
import { ArtistService } from 'src/app/services/artist.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public artistPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";
  @Output() updateArtistsEvent = new EventEmitter<Object>();
  public user!: User;

  constructor(private _oktaStateService: OktaAuthStateService, 
              private _artistService: ArtistService,
              private _router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user = u));

  }

  add(name: string, url: string, bornLocation: string, born: string, died: string, biography: string, adder: number) {
    const artist = {
      name: name, pictureURL: url, bornLocation: bornLocation, born: born, died: died, biography: biography, artistAdderID: adder
    }

    this._artistService.addArtist(artist as unknown as Artist).subscribe(data => {
      this.updateArtists(data);
    });
  }

  updateArtists(data: Object) {
    if (this._router.url === '/addwork') {
      this.updateArtistsEvent.emit(data)
    } else {
      console.log(data)
    }
  }

  updateArtistPicture(url: string) {
    if (url){
      this.artistPictureURL = url;
    }
  }
}

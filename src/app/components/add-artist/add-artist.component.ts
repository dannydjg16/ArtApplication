import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artist from 'src/app/interfaces/artist';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public artPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";

  constructor(private _oktaStateService: OktaAuthStateService, 
              private _artistService: ArtistService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  add(name: string, url: string, bornLocation: string, born: string, died: string, biography: string) {
    const artist = {
      name: name, pictureURL: url, bornLocation: bornLocation, born: born, died: died, biography: biography
    }

    this._artistService.addArtist(artist as unknown as Artist).subscribe(data => {
      console.log(data);
    });
  }

  updateArtPicture(url: string) {
    this.artPictureURL = url;
  }
}

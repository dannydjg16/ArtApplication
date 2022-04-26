import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artist from 'src/app/interfaces/artist';
import ArtType from 'src/app/interfaces/arttype';
import User from 'src/app/interfaces/user';
import { ArtistService } from 'src/app/services/artist.service';
import { ArttypeService } from 'src/app/services/arttype.service';
import { ArtworkService } from 'src/app/services/artwork.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import Artwork from '../../interfaces/artwork';
import Location from '../../interfaces/location';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public user!: User;
  public artists!: Artist[];
  public artTypes!: ArtType[];
  public locations!: Location[];
  public artPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";

  constructor(private _oktaStateService: OktaAuthStateService,
    private _artworkService: ArtworkService,
    private userService: UserService,
    private _artistService: ArtistService,
    private _arttypeService: ArttypeService,
    private _locationService: LocationService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user = u));
    this._artistService.getArtists().subscribe(artists => this.artists = artists);
    this._arttypeService.getArtTypes().subscribe(arttypes => this.artTypes = arttypes);
    this._locationService.getLocations().subscribe(allLocations => this.locations = allLocations);
  }

  add(title: string, url: string, year: string, description: string, artist: string, medium: string, location: string, adder: number) {
    const artwork = {
      title: title, filename: url, yearCreated: Number(year), description: description, locationNow: Number(location),
      artistID: Number(artist), mediumID: Number(medium), artworkAdderID: adder
    }

    this._artworkService.addArtwork(artwork as unknown as Artwork).subscribe(data => {
      console.log(data);
    });
  }

  updateArtPicture(url: string) {
      this.artPictureURL = url;    
  }
}

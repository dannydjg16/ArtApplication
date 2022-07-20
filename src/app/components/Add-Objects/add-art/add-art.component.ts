import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import ArtType from 'src/app/interfaces/arttype';
import User from 'src/app/interfaces/user';
import { ArtistService } from 'src/app/services/artist.service';
import { ArttypeService } from 'src/app/services/arttype.service';
import { ArtworkService } from 'src/app/services/artwork.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import Artwork from '../../../interfaces/artwork';
import Location from '../../../interfaces/location';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public user!: User;
  public artists: any[] = [];
  public artTypes!: ArtType[];
  public locations!: Location[];
  public artPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";
  public whatToAdd = "None"

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
    this._artistService.getArtistsABC().subscribe(artists => this.artists = artists);
    this._arttypeService.getArtTypesABC()
      .subscribe(arttypes => this.artTypes = arttypes);
    this._locationService.getLocationsABC()
      .subscribe(allLocations => this.locations = allLocations);
  }

  add(title: string, url: string, year: string, description: string, artist: string, medium: string, location: string, adder: number) {
    const artwork = {
      title: title, filename: url, yearCreated: Number(year), description: description, locationNow: Number(location),
      artistId: Number(artist), mediumID: Number(medium), artworkAdderID: adder
    }

    this._artworkService.addArtwork(artwork as unknown as Artwork).subscribe(data => {
      console.log(data);
    });
  }

  updateArtPicture(url: string) {
    if (url) {
      this.artPictureURL = url;
    }
  }

  // Updating Select for Locations when a new location is added
  updateLocations(data: Object) {
    this._locationService.getLocationsABC().subscribe({
      next: (allLocations) => this.locations = allLocations,
      error: (data) => console.log(data),
      complete: () => window.confirm("Location Added")
    });
    console.log(data);
  }

  // Updating Select for Artists when a new artist is added 
  updateArtists(data: Object) {
    this._artistService.getArtistsABC().subscribe({
      next: (artists) => this.artists = artists,
      error: (data) => console.log(data),
      complete: () => window.confirm("Artist Added")
    });
  }

  // Updating Select for Art Types when a new art type is added 
  updateArtTypes(data: Object) {
    this._arttypeService.getArtTypesABC().subscribe({
      next: (arttypes) => this.artTypes = arttypes,
      error: (data) => console.log(data),
      complete: () => window.confirm("Art Type Added")
    })
  }

  // Show/Hide AddArtist
  popUpArtist() {
    if (this.whatToAdd == "Artist") {
      this.whatToAdd = "None"
    } else {
      this.whatToAdd = "Artist"
    }
  }

  // Show/Hide AddMedium
  popUpMedium() {
    if (this.whatToAdd == "Medium") {
      this.whatToAdd = "None"
    } else {
      this.whatToAdd = "Medium"
    }
  }

  // Show/Hide AddLocation
  popUpLocation() {
    if (this.whatToAdd == "Location") {
      this.whatToAdd = "None"
    } else {
      this.whatToAdd = "Location"
    }
  }
}

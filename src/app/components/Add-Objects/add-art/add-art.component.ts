import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import Artist from 'src/app/interfaces/artist';
import ArtType from 'src/app/interfaces/arttype';
import ArtworkAdd from 'src/app/interfaces/artworkAdd';
import User from 'src/app/interfaces/user';
import { ArtistService } from 'src/app/services/artist.service';
import { ArttypeService } from 'src/app/services/arttype.service';
import { ArtworkService } from 'src/app/services/artwork.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import Location from '../../../interfaces/location';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public user!: User;
  public artists: Artist[] = [];
  public artTypes!: ArtType[];
  public locations!: Location[];
  public artPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";
  public whatToAdd = "None"
  public artToAdd: ArtworkAdd = {};

  constructor(private _oktaStateService: OktaAuthStateService,
    private _artworkService: ArtworkService,
    private userService: UserService,
    private _artistService: ArtistService,
    private _arttypeService: ArttypeService,
    private _locationService: LocationService,
    private _router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this._oktaStateService.authState$
      .subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!)
        .subscribe({
          next: (u) => this.user = u,
          error: () => null,
          complete: () => this.createArrays()
        }));
  }

  add(artist: string, medium: string, location: string, adder: number) {
    this.artToAdd.artistId = Number(artist);
    this.artToAdd.mediumId = Number(medium);
    this.artToAdd.locationNow = Number(location);
    this.artToAdd.artworkAdderId = adder;

    this._artworkService.addArtwork(this.artToAdd).subscribe({
      next: (data) => console.log(data),
      error: () => null,
      complete: () => this.afterArtAdd()
    })
  }

  afterArtAdd(){
    window.confirm("Art Work Added!!");
    this._router.navigate(['gallery']);
  }

  createArrays() {
    this._artistService.getArtistsABC()
      .subscribe(artists => this.artists = artists);
    this._arttypeService.getArtTypesABC()
      .subscribe(arttypes => this.artTypes = arttypes);
    this._locationService.getLocationsABC()
      .subscribe(allLocations => this.locations = allLocations);
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
      error: (err) => console.log(err),
      complete: () => this.afterLocationAdd()
    });
    console.log(data);
  }

  // What to do after adding Location
  afterLocationAdd(){
    window.confirm("Location Added!!");
    this.whatToAdd = "None";
  }

  // Updating Select for Artists when a new artist is added 
  updateArtists(_data: Object) {
    this._artistService.getArtistsABC().subscribe({
      next: (artists) => this.artists = artists,
      error: (err) => console.log(err),
      complete: () => this.afterArtistAdd()
    });
  }
    // What to do after adding Location
    afterArtistAdd(){
      window.confirm("Artist Added!!");
      this.whatToAdd = "None";
    }

  // Updating Select for Art Types when a new art type is added 
  updateArtTypes(_data: Object) {
    this._arttypeService.getArtTypesABC().subscribe({
      next: (arttypes) => this.artTypes = arttypes,
      error: (err) => console.log(err),
      complete: () => this.afterArtTypeAdd()
    })
  }
  // What to do after adding Location
  afterArtTypeAdd(){
    window.confirm("Art Type Added!!");
    this.whatToAdd = "None";
  }

  // Show/Hide AddArtist
  popUpArtist() {
    if (this.whatToAdd == "Artist") {
      this.whatToAdd = "None";
    } else {
      this.whatToAdd = "Artist";
    }
  }

  // Show/Hide AddMedium
  popUpMedium() {
    if (this.whatToAdd == "Medium") {
      this.whatToAdd = "None";
    } else {
      this.whatToAdd = "Medium";
    }
  }

  // Show/Hide AddLocation
  popUpLocation() {
    if (this.whatToAdd == "Location") {
      this.whatToAdd = "None";
    } else {
      this.whatToAdd = "Location";
    }
  }
}

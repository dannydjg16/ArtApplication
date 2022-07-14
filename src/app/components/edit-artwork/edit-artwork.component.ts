import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import Artist from 'src/app/interfaces/artist';
import ArtType from 'src/app/interfaces/arttype';
import Artwork from 'src/app/interfaces/artwork';
import User from 'src/app/interfaces/user';
import Location from '../../interfaces/location';
import { ArtworkService } from 'src/app/services/artwork.service';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';
import { ArttypeService } from 'src/app/services/arttype.service';
import { LocationService } from 'src/app/services/location.service';


@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.css']
})
export class EditArtworkComponent implements OnInit {

  public user!: User;
  public artPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";
  sub: any;
  artworkToEdit!: Artwork;
  public artists!: Artist[];
  public artTypes!: ArtType[];
  public locations!: Location[];

  constructor(
    private userService: UserService,
    private _oktaStateService: OktaAuthStateService,
    private _artworkService: ArtworkService,
    private route: ActivatedRoute,
    private _artistService: ArtistService,
    private _arttypeService: ArttypeService,
    private _locationService: LocationService) { }

  ngOnInit(): void {
    this._oktaStateService.authState$
      .subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!)
        .subscribe(u => this.user = u));

    // Set Artwork Picture
    this._artworkService.getFullArtworkById(this.route.snapshot.params['id']).subscribe({
      next: (aw) => this.setArtworkAndURL(aw),
      error: () => null,
      complete: () => this.createArrays()
    })
  }

  edit() {
    this._artworkService.editArtwork(this.artworkToEdit).subscribe(data => {
      console.log(data);
    });;
  }

  setArtworkAndURL(artwork: Artwork) {
    this.artworkToEdit = artwork;
    this.artPictureURL = artwork.fileName;
  }

  updateArtPicture(url: string) {
    this.artPictureURL = url;
  }

  // This method creates all of the Arrays for the Select stmts.
  createArrays() {
    this.getLocations();
    this.getArtists();
    this.getArttypes();
  }

  // Get locations then call the create array function
  getLocations() {
    this._locationService.getLocationsABC().subscribe(locations => this.createLocationArray(locations));
  }
  createLocationArray(locations: Location[]) {
    if (this.artworkToEdit.location) {
      this.locations = locations.filter(location => location !== this.artworkToEdit.location);
    }
  }

  // Get artists then call the create array function
  getArtists() {
    this._artistService.getArtists().subscribe(artists => this.createArtistArray(artists));
  }
  createArtistArray(artists: Artist[]) {
    this.artists = artists.sort(function (x, y) {
      if (x.name < y.name) return -1;
      if (x.name > y.name) return 1;
      return 0;
    });
    if (this.artworkToEdit.artistId) {
      this.artists = artists.filter(artist => artist.id !== this.artworkToEdit.artistId);
    }
  }

  // Get art types then call the create array function
  getArttypes() {
    this._arttypeService.getArtTypes().subscribe(arttypes => this.createArttypeArray(arttypes));
  }
  createArttypeArray(arttypes: ArtType[]) {
    this.artTypes = arttypes.sort(function (x, y) {
      if (x.name < y.name) return -1;
      if (x.name > y.name) return 1;
      return 0;
    });
    if (this.artworkToEdit.mediumId) {
      this.artTypes = arttypes.filter(arttype => arttype.id !== this.artworkToEdit.mediumId);
    }
  }


}

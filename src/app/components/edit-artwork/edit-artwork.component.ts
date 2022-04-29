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
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user = u));

    // Set Artwork Picture
    this._artworkService.getArtorkById(this.route.snapshot.params['id']).subscribe(aw => this.setArtworkAndURL(aw));

    // Get arrays to populate for the select elements
    this._artistService.getArtists().subscribe(artists => this.artists = artists);
    this._arttypeService.getArtTypes().subscribe(arttypes => this.artTypes = arttypes);
    this._locationService.getLocations().subscribe(allLocations => this.locations = allLocations);
  }

  edit(title: string, url: string, year: string, description: string, artist: string, medium: string, location: string, adder: number) {

  }

  setArtworkAndURL(artwork: Artwork) {
    this.artworkToEdit = artwork;
    this.artPictureURL = artwork.fileName;
  }

  updateArtPicture(url: string) {
    this.artPictureURL = url;
  }
}

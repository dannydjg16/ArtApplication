import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-gallery',
  templateUrl: './location-gallery.component.html',
  styleUrls: ['./location-gallery.component.css']
})
export class LocationGalleryComponent implements OnInit {

  public locations!: Location[];

  constructor(private _oktaAuthService: OktaAuthStateService, private _locationService: LocationService) { }

  ngOnInit(): void {

    this._locationService.getLocations().subscribe(locs => this.locations = locs);
  }
}

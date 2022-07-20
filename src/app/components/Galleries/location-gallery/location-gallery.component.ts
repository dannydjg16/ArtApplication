import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import  Location  from '../../interfaces/location';

@Component({
  selector: 'app-location-gallery',
  templateUrl: './location-gallery.component.html',
  styleUrls: ['./location-gallery.component.css']
})
export class LocationGalleryComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public locations!: Location[];

  constructor(private _oktaStateService: OktaAuthStateService, 
              private _locationService: LocationService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this._locationService.getLocations().subscribe(locs => this.locations = locs);
    
  }
}

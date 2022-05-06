import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import LocationType from 'src/app/interfaces/locationtype';
import { LocationService } from 'src/app/services/location.service';
import { LocationTypeService } from 'src/app/services/locationtype.service';
import  Location  from '../../interfaces/location';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public locationtypes!: LocationType[];

  constructor(private _oktaStateService: OktaAuthStateService, 
              private _locationService: LocationService,
              private _locationtypeService: LocationTypeService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this._locationtypeService.getLocationTypes().subscribe(loctyps => this.locationtypes = loctyps);
  }

  add(locationName: string, locationURL: string, description: string, locationTypeID: string) {
    const location = {
      locationName: locationName, locationURL: locationURL, description: description, typeID:  Number(locationTypeID)
    };

    this._locationService.addLocation(location as unknown as Location).subscribe(data => {
      console.log(data);
    });
  }
}

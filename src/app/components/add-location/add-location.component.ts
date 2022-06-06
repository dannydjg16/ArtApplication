import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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
  @Output() updateLocationsEvent = new EventEmitter<Object>();

  constructor(private _oktaStateService: OktaAuthStateService, 
              private _locationService: LocationService,
              private _locationtypeService: LocationTypeService,
              private _router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    this._locationtypeService.getLocationTypes().subscribe(loctyps => 
      this.locationtypes = loctyps.sort(function(x,y) {
        if (x.name < y.name) return -1;
        if (x.name > y.name) return 1;
        return 0;
      }) );
  }

  add(locationName: string, locationURL: string, description: string, locationTypeID: string) {
    const location = {
      locationName: locationName, locationURL: locationURL, description: description, typeID:  Number(locationTypeID)
    };

    this._locationService.addLocation(location as unknown as Location).subscribe(data => {
      this.updateLocations(data);
    });
  }

  updateLocations(data: Object) {
    if (this._router.url === '/addwork') {
      this.updateLocationsEvent.emit(data)
    } else {
      console.log(data)
    }
  }

}

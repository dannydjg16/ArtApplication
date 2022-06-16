import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import Location from 'src/app/interfaces/location';
import LocationType from 'src/app/interfaces/locationtype';
import User from 'src/app/interfaces/user';
import { LocationService } from 'src/app/services/location.service';
import { LocationTypeService } from 'src/app/services/locationtype.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {

  user!: User;
  locationToEdit!: Location;
  locationtypes!: LocationType[];
  locationType!: LocationType;


  constructor(private userService: UserService,
              private _oktaStateService: OktaAuthStateService,
              private _locationService: LocationService,
              private _locationtypeService: LocationTypeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user = u));

    this._locationService.getLocationById(this.route.snapshot.params['id']).subscribe({
      next: loc => this.locationToEdit = loc ,
      error: () => null ,
      complete: () => this.getLocationTypes()
    });  
  }

  edit() {
    this._locationService.editLocation(this.locationToEdit).subscribe(data => {
      console.log(data);
    });
  }

  // Get location types then call the create array function
  getLocationTypes() {
      this._locationtypeService.getLocationTypes().subscribe(locTypes => this.createLocationTypeArray(locTypes));
  }
  createLocationTypeArray(locationTypes: LocationType[]) {
    this.locationtypes = locationTypes.sort(function (x, y) {
      if (x.name < y.name) return -1;
      if (x.name > y.name) return 1;
      return 0;
    });
    if (this.locationToEdit) {
      this.locationType = locationTypes.find(locType => locType.id === this.locationToEdit.typeId)!;
      this.locationtypes = locationTypes.filter(locType => locType.id !== this.locationToEdit.typeId);
    }
  }
}


import { Component, OnInit } from '@angular/core';
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

  public user!: User;
  locaitonToEdit!: Location;
  route: any;
  public locationtypes!: LocationType[];


  constructor(private userService: UserService,
              private _oktaStateService: OktaAuthStateService,
              private _locationService: LocationService,
              private _locationtypeService: LocationTypeService) { }

  ngOnInit(): void {
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user = u));

    this._locationService.getLocationById(this.route.snapshot.params['id']).subscribe(loc => this.locaitonToEdit = loc);
    this._locationtypeService.getLocationTypes().subscribe(loctyps => this.locationtypes = loctyps);
  }

  edit() {
    this._locationService.editLocation(this.locaitonToEdit).subscribe(data => {
      console.log(data);
    });;
  }
}
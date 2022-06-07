import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import LocationType from 'src/app/interfaces/locationtype';
import User from 'src/app/interfaces/user';
import { LocationTypeService } from 'src/app/services/locationtype.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-location-type',
  templateUrl: './add-location-type.component.html',
  styleUrls: ['./add-location-type.component.css']
})
export class AddLocationTypeComponent implements OnInit {

  public user!: User;
  public locationTypes!: LocationType[];
  addingLocation = false;
  @Output() updateLocationTypesEvent = new EventEmitter<Object>();
  
  constructor(private _oktaStateService: OktaAuthStateService,
              private _ltService: LocationTypeService,
              private userService: UserService,
              private _router: Router) { }

  ngOnInit(): void {
    this._oktaStateService.authState$
      .subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!)
      .subscribe(u => this.user = u));
  }

  add(name: string) {
    const locationType = {
      name: name
    }

    this._ltService.addLocationType(locationType as unknown as LocationType).subscribe(data => {
      this.updateLocationTypes(data);
    });
  }

  updateLocationTypes(data: Object) {
    if (this._router.url === '/addwork' || this._router.url == 'addlocation') {
      this.updateLocationTypesEvent.emit(data)
    } else {
      console.log(data)
    }
  }

  showAddForm() {
    if(this.addingLocation == true) {
      this.addingLocation = false;
    } else {
      this.addingLocation = true;
    }
  }
}

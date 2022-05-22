import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
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

  constructor(private _oktaStateService: OktaAuthStateService,
              private _ltService: LocationTypeService,
              private userService: UserService,) { }

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
      console.log(data);
    });
  }

}

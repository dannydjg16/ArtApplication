import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import Location from 'src/app/interfaces/location';
import User from 'src/app/interfaces/user';
import { LocationService } from 'src/app/services/location.service';
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

  constructor(private userService: UserService,
              private _oktaStateService: OktaAuthStateService,
              private _locationService: LocationService) { }

  ngOnInit(): void {
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user = u));

    this._locationService.getLocationById(this.route.snapshot.params['id']).subscribe(loc => this.locaitonToEdit = loc);
  }

}

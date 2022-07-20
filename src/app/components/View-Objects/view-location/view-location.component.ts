import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import Location from 'src/app/interfaces/location';
import User from 'src/app/interfaces/user';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.css']
})
export class ViewLocationComponent implements OnInit {

  public user!: User;
  public viewLocation!: Location;
  public userAddedLocation: boolean = true;

  constructor(private userService: UserService,
              private _oktaStateService: OktaAuthStateService,
              private _locationService: LocationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._oktaStateService.authState$
    .subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!)
      .subscribe(u => this.setLocationAndUser(u)));
  }

  setLocationAndUser(user: User) {
    this.user = user;
    this._locationService.getLocationById(this.route.snapshot.params['id'])
      .subscribe(location => this.viewLocation = location);
  }

  navigateToWebsite(){
    window.location.assign(this.viewLocation.locationUrl);
  }
}

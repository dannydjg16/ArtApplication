import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { OktaAuthStateService } from '@okta/okta-angular';
import User from 'src/app/interfaces/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user!: User;

  constructor(private location: Location, 
              private userService: UserService, 
              private _oktaStateService: OktaAuthStateService) { }

  ngOnInit(): void {
    // Getting the user from db using okta email and setting user var equal to that user
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user = u));
  }

  edit(userID: number, name: string, email: string, fromLocation: string, profilePicURL: string) {
    const user = {
      id: userID, name: name, email: email, fromLocation: fromLocation, profilePicURL: profilePicURL
    }

    this.userService.editUser(userID, user as unknown as User).subscribe(data => {
      console.log(data);
    });
  }

  goBack(): void {
    this.location.back();
  }
}

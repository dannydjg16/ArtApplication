import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { OktaAuthStateService } from '@okta/okta-angular';
import User from 'src/app/interfaces/user';
import { userInfo } from 'os';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user!: User;
  public userPictureURL = "https://thepowerofthedream.org/wp-content/uploads/2015/09/generic-profile-picture-300x300.jpg";


  constructor(private location: Location, 
              private userService: UserService, 
              private _oktaStateService: OktaAuthStateService) { }

  ngOnInit(): void {
    // Getting the user from db using okta email and setting user var equal to that user
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.setUser(u)));
  
  }

  edit(userID: number, name: string, email: string, fromLocation: string, profilePicURL: string) {
    const user = {
      id: userID, name: name, email: email, fromLocation: fromLocation, profilePicURL: profilePicURL
    }

    this.userService.editUser(userID, user as unknown as User).subscribe(data => {
      console.log(data);
    });
  }

  setUser(user: User){
    this.user = user;
    this.userPictureURL = user.profilePicURL;
  }

  goBack(): void {
    this.location.back();
  }

  updateUserPicture(url: string) {
    this.userPictureURL = url;    
}
}

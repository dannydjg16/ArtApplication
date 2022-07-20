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

  public signedIn!: User;
  public user!: User;
  public userPictureURL = "https://thepowerofthedream.org/wp-content/uploads/2015/09/generic-profile-picture-300x300.jpg";


  constructor(private location: Location, 
              private userService: UserService, 
              private _oktaStateService: OktaAuthStateService) { }

  ngOnInit(): void {
    // Getting the user from db using okta email and setting user var equal to that user
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.setUser(u)));
  }

  edit(user: User) {
    this.userService.editUser(user as unknown as User).subscribe(data => {
      console.log(data);
    });
  }

  setUser(user: User){
    this.user = user;
    if (this.user.profilePicURL) {
      this.userPictureURL = user.profilePicURL;
    }
    this.signedIn = user
  }

  goBack(): void {
    this.location.back();
  }

  updateUserPicture(url: string) {
    this.userPictureURL = url;    
}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import User from 'src/app/interfaces/user';
import { ArtworkService } from 'src/app/services/artwork.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-artwork',
  templateUrl: './edit-artwork.component.html',
  styleUrls: ['./edit-artwork.component.css']
})
export class EditArtworkComponent implements OnInit {

  public user!: User;
  public artPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";
  sub: any;

  constructor(private location: Location, 
    private userService: UserService, 
    private _oktaStateService: OktaAuthStateService,
    private _artworkService: ArtworkService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._oktaStateService.authState$.subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!).subscribe(u => this.user =u));

    // Set Artwork Picture
    this.sub = this.route.data.subscribe(id => console.log(id));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

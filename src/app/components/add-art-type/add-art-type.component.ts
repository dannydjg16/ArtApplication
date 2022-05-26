import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import ArtType from 'src/app/interfaces/arttype';
import User from 'src/app/interfaces/user';
import { ArttypeService } from 'src/app/services/arttype.service';
import { LocationTypeService } from 'src/app/services/locationtype.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-art-type',
  templateUrl: './add-art-type.component.html',
  styleUrls: ['./add-art-type.component.css']
})
export class AddArtTypeComponent implements OnInit {

  public user!: User;

  constructor(private _oktaStateService: OktaAuthStateService,
              private _atService: ArttypeService,
              private userService: UserService,) { }

  ngOnInit(): void {
    this._oktaStateService.authState$
    .subscribe(as => this.userService.getUserByEmail(as.accessToken?.claims.sub!)
    .subscribe(u => this.user = u));
  }

  add(name: string, description: string) {

    const arttype = {
      name: name,
      description: description
    }

    this._atService.addArtType(arttype as unknown as ArtType).subscribe(data => {
      console.log(data);
    });
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import ArtType from 'src/app/interfaces/arttype';
import User from 'src/app/interfaces/user';
import { ArttypeService } from 'src/app/services/arttype.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-art-type',
  templateUrl: './add-art-type.component.html',
  styleUrls: ['./add-art-type.component.css']
})
export class AddArtTypeComponent implements OnInit {

  public user!: User;
  @Output() updateArtTypesEvent = new EventEmitter<Object>();

  constructor(private _oktaStateService: OktaAuthStateService,
              private _atService: ArttypeService,
              private userService: UserService,
              private _router: Router) { }

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
      this.updateArtists(data);
    });
  }

  updateArtists(data: Object) {
    if (this._router.url === '/addwork') {
      this.updateArtTypesEvent.emit(data)
    } else {
      console.log(data)
    }
  }
}

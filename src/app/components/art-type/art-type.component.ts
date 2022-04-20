import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import ArtType from 'src/app/interfaces/arttype';
import { ArttypeService } from 'src/app/services/arttype.service';

@Component({
  selector: 'app-art-type',
  templateUrl: './art-type.component.html',
  styleUrls: ['./art-type.component.css']
})
export class ArtTypeComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;

  constructor(private _oktaStateService: OktaAuthStateService, 
              private _artTypeService: ArttypeService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  add(title: string, description: string) {
    const artType = {
      title: title, description: description
    }

    this._artTypeService.addArtType(artType as unknown as ArtType).subscribe(data => {
      console.log(data);
    });
  }
}

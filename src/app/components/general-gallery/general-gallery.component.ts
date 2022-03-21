import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-general-gallery',
  templateUrl: './general-gallery.component.html',
  styleUrls: ['./general-gallery.component.css']
})
export class GeneralGalleryComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;

  constructor(private _oktaStateService: OktaAuthStateService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

}

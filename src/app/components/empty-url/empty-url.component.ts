import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-empty-url',
  templateUrl: './empty-url.component.html',
  styleUrls: ['./empty-url.component.css']
})
export class EmptyURLComponent implements OnInit {

  isAuthenticated = false;

  constructor(private _oktaStateService: OktaAuthStateService,) { }

  ngOnInit(): void {
    this._oktaStateService.authState$.subscribe(
      s => this.isAuthenticated = s.isAuthenticated ?? false
    );
  }

}

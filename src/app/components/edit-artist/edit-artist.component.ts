import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { Observable } from 'rxjs';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {

  public isAuthenticated$!: Observable<boolean>;
  public artistPictureURL = "https://cdn.pixabay.com/photo/2014/08/25/16/17/picture-frame-427233_960_720.jpg";

  constructor(private _oktaStateService: OktaAuthStateService, 
    private _artistService: ArtistService) { }

  ngOnInit(): void {
  }

}

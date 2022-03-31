import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import Artist from 'src/app/interfaces/artist';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist-gallery',
  templateUrl: './artist-gallery.component.html',
  styleUrls: ['./artist-gallery.component.css']
})
export class ArtistGalleryComponent implements OnInit {

  public artists!: Artist[];

  constructor(private _oktaStateService: OktaAuthStateService, private _artistService: ArtistService) { }

  ngOnInit(): void {

    this._artistService.getArtists().subscribe(ats => this.artists = ats);
  }

}

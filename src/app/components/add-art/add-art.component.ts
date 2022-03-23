import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';
import  Artwork  from '../../interfaces/artwork';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit {

  constructor(private _artworkService: ArtworkService) { }

  ngOnInit(): void {
  }


  add(title: string, url: string, year: string, description: string, artist: string, medium: string, location: string) {
    const artwork = {
      title: title, filename: url, yearCreated: Number(year), description: description, locationNow: Number(location), artistID: Number(artist), mediumID: Number(medium)
    }

    this._artworkService.addArtwork(artwork as unknown as Artwork).subscribe(data => {
      console.log(data);
    });
  }

}

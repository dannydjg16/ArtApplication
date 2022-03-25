import { Component, OnInit } from '@angular/core';
import Artist from 'src/app/interfaces/artist';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent implements OnInit {

  constructor(private _artistService: ArtistService) { }

  ngOnInit(): void {
  }


  add(name: string, url: string, bornLocation: string, born: string, died: string, biography: string) {
    const artist = {
      name: name, pictureURL: url, bornLocation: bornLocation, born: born, died: died, biography: biography
    }

    this._artistService.addArtist(artist as unknown as Artist).subscribe(data => {
      console.log(data);
    });
  }

}

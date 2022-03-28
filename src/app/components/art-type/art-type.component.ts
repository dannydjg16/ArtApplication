import { Component, OnInit } from '@angular/core';
import ArtType from 'src/app/interfaces/arttype';
import { ArttypeService } from 'src/app/services/arttype.service';

@Component({
  selector: 'app-art-type',
  templateUrl: './art-type.component.html',
  styleUrls: ['./art-type.component.css']
})
export class ArtTypeComponent implements OnInit {

  constructor(private _artTypeService: ArttypeService) { }

  ngOnInit(): void {
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

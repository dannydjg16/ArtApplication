import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  constructor(private _locationService: LocationService) { }

  ngOnInit(): void {
  }

  add(locationName: string, locationURL: string, description: string, locationTypeID: string) {
    const location = {
      locationName: locationName, locationURL: locationURL, description: description, locationTypeID: locationTypeID
    };

    this._locationService.addLocation(location as unknown as Location).subscribe(data => {
      console.log(data);
    });
  }
}

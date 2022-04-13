import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
}

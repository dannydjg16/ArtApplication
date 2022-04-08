import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.css']
})
export class PostActionsComponent implements OnInit {

  @Input() theArtwork : any;
  @Input() theUser : any;

  constructor() { }

  ngOnInit(): void {
  }

  public LikeOrUnlikePost() {
  }

}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-junk',
  templateUrl: './junk.component.html',
  styleUrls: ['./junk.component.css']
})
export class JunkComponent implements OnInit {
  collapsed = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() data: any;
  panelOpenState = false;

  constructor() {}

  ngOnInit(): void {}
}

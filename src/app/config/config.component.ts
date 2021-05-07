import { Component, OnInit } from '@angular/core';
import { SearchService, weight } from '../services/search.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  weight: weight;
  constructor(private searchServce: SearchService) {}

  ngOnInit(): void {
    let res: weight = this.searchServce.getDefaultWeight();
    this.weight = { skill: res.skill, exp: res.exp };
  }
  onSlided(value: weight): void {
    this.weight = {
      skill: value.skill,
      exp: value.exp,
    };
  }
  updateWeight(): void {
    this.searchServce.setDefaultWeight(this.weight);
  }
}

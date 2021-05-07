import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  max = 100;
  min = 0;
  step = 1;
  thumbLabel = true;
  vertical = false;
  @Input() skills = 30;
  @Input() experience = 70;
  @Output() slided = new EventEmitter<any>();
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}
  change(): void {
    this.experience = 100 - this.skills;
    this.slided.emit({
      skill: this.skills,
      exp: this.experience,
    });
  }
}

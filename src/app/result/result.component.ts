import { Component, OnInit } from '@angular/core';
import { SearchService, weight } from '../services/search.service';
import { ProfilService } from '../services/profils.service';
import { Router } from '@angular/router';
import { LoggerService } from '../services/logger.service';
import { DownloadComponent } from '../shared/download/download.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  result = [];
  rawData = [];
  error = true;
  displaySpinner = false;
  searchText: string;
  disabled = true;
  weight: weight;
  rowNumber = 0;
  hasData = false;

  constructor(
    private searchService: SearchService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let res = this.searchService.getDefaultWeight();
    this.weight = { skill: res.skill, exp: res.exp };

    this.searchService.result.subscribe((data: any) => {
      if (!(Object.keys(data).length === 0)) {
        this.rawData = data;
        this.hasData = true;
        this.result = this.prepareData(data);
        this.rowNumber = data.total_items + 1;
      }
    });
  }

  download() {
    this.dialog.open(DownloadComponent, {
      width: '500px',
      data: this.result,
    });
  }

  search(): void {
    this.displaySpinner = true;
    this.searchService.search(this.searchText).subscribe((data) => {
      this.searchService.setResult(data);
      this.hasData = true;
      this.displaySpinner = false;
    });
  }

  onFilled(value: any): void {
    if (value.length == 0) {
      this.error = true;
    } else {
      this.error = false;
      this.searchText = value;
    }
  }

  prepareData(data: any): Object[] {
    const { final_score, exp_score, skills_note } = data;
    if (final_score == undefined) {
      return [];
    }
    let output = [];
    for (let i = 0; i < final_score.length; i++) {
      const { name, score } = final_score[i];
      output.push({
        name: name,
        score: score,
        skills_note: skills_note[name],
        exp_note: exp_score[name],
      });
    }
    return output;
  }

  onSlided(value: weight): void {
    if (Object.keys(this.rawData).length !== 0) {
      this.result = this.prepareData(
        this.searchService.rank(this.rawData, value)
      );
    }
  }
}

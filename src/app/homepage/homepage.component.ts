import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  logo: string = '../assets/search.png';
  error = true;
  displaySpinner = false;
  searchText: string;

  constructor(
    private logger: LoggerService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit() {}

  search(): void {
    this.displaySpinner = true;
    this.searchService.search(this.searchText).subscribe((data) => {
      this.searchService.setResult(data);
      this.router.navigateByUrl('/result');
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
}

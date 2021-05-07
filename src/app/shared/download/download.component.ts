import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoggerService } from '../../services/logger.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  spinnerMode = 'indeterminate';
  displaySpinner = false;
  error = false;
  selectedCV = [];
  constructor(
    public dialogRef: MatDialogRef<DownloadComponent>,
    private logger: LoggerService,
    private searchService: SearchService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  download(): void {
    this.searchService.download(this.selectedCV);
    this.close();
  }
  onGroupsChange(value) {
    this.selectedCV = value;
  }

  close(): void {
    this.dialogRef.close();
  }
}

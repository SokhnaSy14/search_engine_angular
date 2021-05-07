import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LoggerService } from '../../services/logger.service';
import { ProfilService } from '../../services/profils.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  @Output() filled = new EventEmitter<Boolean>();

  constructor(
    private profilService: ProfilService,
    private logger: LoggerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.myControl.valueChanges.subscribe((val) => {
      this.filled.emit(val);
    });

    this.profilService.getProfilLabel();
    this.profilService.profils.subscribe(
      (labels) => {
        this.options = labels;
      },
      (error) => {
        this.logger.error(error);
      }
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
}

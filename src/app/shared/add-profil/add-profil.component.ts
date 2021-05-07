import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profil, ProfilService } from '../../services/profils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-add-profil',
  templateUrl: './add-profil.component.html',
  styleUrls: ['./add-profil.component.css'],
})
export class AddProfilComponent implements OnInit {
  profilForm: FormGroup;
  action: string;
  spinnerMode = 'indeterminate';
  displaySpinner = false;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProfilComponent>,
    private logger: LoggerService,
    private profilService: ProfilService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.action = this.data.action == 0 ? 'Update' : 'Add';
    this.profilForm = this.formBuilder.group({
      label: [this.data.label, [Validators.required, Validators.minLength(3)]],
      required: [this.data.required, [Validators.required]],
      optional: [this.data.optional],
    });
  }
  checkInput(): void {
    this.error = this.profilForm.valid;
  }

  handleClick(data: any): void {
    this.displaySpinner = !this.displaySpinner;
    if (this.action.toLowerCase() == 'add') {
      this.addProfil(data);
    } else {
      this.updateProfil(data);
    }
    this.displaySpinner = !this.displaySpinner;
    this.dialogRef.close();
  }

  addProfil(profil: any): void {
    this.profilService.addProfil(profil).subscribe(
      (data) => {
        this.logger.log(data);
      },
      (error) => {
        this.logger.error(error);
      }
    );
  }

  updateProfil(profil: any): void {
    profil.required = Array.isArray(profil.required)
      ? profil.required
      : [profil.required];
    profil.optional = Array.isArray(profil.optional)
      ? profil.optional
      : [profil.optional];

    profil = Object.assign({}, profil, { id: this.data.id });

    this.profilService.updateProfil(profil).subscribe(
      (data) => {
        this.logger.log(data);
      },
      (error) => {
        this.logger.error(error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}

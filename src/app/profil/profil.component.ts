import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Profil, ProfilService } from '../services/profils.service';
import { LoggerService } from '../services/logger.service';
import { MatDialog } from '@angular/material/dialog';

import { AddProfilComponent } from '../shared/add-profil/add-profil.component';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  displayedColumns: string[] = ['label', 'required', 'optional', 'action'];

  selection = new SelectionModel<Profil>(true, []);
  dataSource: any;

  constructor(
    private profilService: ProfilService,
    private logger: LoggerService,
    public dialog: MatDialog,
    public confirm: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshDataSource();
  }

  openDialog(idProfil: string, action: number): void {
    //open dialog for creating a new profil
    let data: any;
    let profil: any;
    if (action != 0) {
      // 0 update profil 1 create a new profil
      let tmps = this.dataSource.filteredData;
      for (let i in tmps) {
        if (tmps[i].id == idProfil) {
          profil = tmps[i];
        }
      }

      data = {
        action: 0,
        id: profil.id,
        label: profil.label,
        required: profil.required,
        optional: profil.optional,
      };
    } else {
      data = { action: 1 };
    }

    const dialogRef = this.dialog.open(AddProfilComponent, {
      width: '500px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.refreshDataSource();
    });
    this.refreshDataSource();
  }

  refreshDataSource(): void {
    this.profilService.getProfils().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<Profil>(data);
      },
      (error) => {
        this.logger.error(error);
      }
    );
  }

  delete(idProfil: string): void {
    const confirmRef = this.confirm.open(ConfirmComponent);
    confirmRef.afterClosed().subscribe((result) => {
      if (result) {
        this.profilService.deleteProfil(idProfil).subscribe(
          (result) => {
            this.refreshDataSource();
          },
          (error) => {
            //this.logger.error(error);
          }
        );
      }
    });
  }
}

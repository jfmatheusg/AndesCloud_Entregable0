import { Injectable } from '@angular/core';
import { ErrorRestComponent } from './error-rest.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable()
export class ErrorRestService {

  constructor(public dialog: MatDialog) { }
  openDialog(data, resolve): void {
    const dialogRef = this.dialog.open(ErrorRestComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      resolve();
    });
  }
}

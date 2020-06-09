import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

/**
 * ui page holder for a graphQL UI API documentation viewer
 */
@Component({
  selector: 'pharos-api-page',
  templateUrl: './api-page.component.html',
  styleUrls: ['./api-page.component.scss']
})


export class ApiPageComponent implements OnInit{
  /**
   * no args constructor
   */
  constructor(public dialog: MatDialog){}

  openDialog() {
    const dialogRef = this.dialog.open(ApiHelpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(){
    this.openDialog();
  }
}

@Component({
  selector: 'pharos-api-help',
  templateUrl: './api-help.component.html',
  styleUrls: ['./api-help.component.scss']
})

export class ApiHelpComponent {}

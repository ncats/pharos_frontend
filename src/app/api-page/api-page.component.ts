import {Component, Inject, InjectionToken, OnInit, PLATFORM_ID} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {isPlatformBrowser} from "@angular/common";

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
  constructor(public dialog: MatDialog,
              @Inject(PLATFORM_ID) private platformID: Object){}

  openDialog() {
    const dialogRef = this.dialog.open(ApiHelpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(){
    if(isPlatformBrowser(this.platformID)) {
      this.openDialog();
    }
  }
}

@Component({
  selector: 'pharos-api-help',
  templateUrl: './api-help.component.html',
  styleUrls: ['./api-help.component.scss']
})

export class ApiHelpComponent {}

import {Component, Inject, InjectionToken, OnInit, PLATFORM_ID, SecurityContext} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {isPlatformBrowser} from "@angular/common";
import {DomSanitizer} from '@angular/platform-browser';
import {UnfurlingMetaService} from "../pharos-services/unfurling-meta.service";
import {environment} from "../../environments/environment";

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
  constructor(private sanitizer: DomSanitizer,
              public dialog: MatDialog,
              @Inject(PLATFORM_ID) private platformID: Object,
              private metaService: UnfurlingMetaService){}
  openDialog() {
    const dialogRef = this.dialog.open(ApiHelpComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  url = this.sanitizer.bypassSecurityTrustResourceUrl(environment.graphqlUrl);

  ngOnInit(){
    if(isPlatformBrowser(this.platformID)) {
      this.openDialog();
    }
    let newDescription = 'Build and run queries on the Pharos GraphQL server.';
    let newTitle = `Pharos: GraphQL API`;
    this.metaService.setMetaData({description: newDescription, title: newTitle});
  }
}

@Component({
  selector: 'pharos-api-help',
  templateUrl: './api-help.component.html',
  styleUrls: ['./api-help.component.scss']
})

export class ApiHelpComponent {}

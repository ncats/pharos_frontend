import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Disease} from "../../../../models/disease";
import {takeUntil} from "rxjs/operators";
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";
import {NavSectionsService} from "../../../../tools/sidenav-panel/services/nav-sections.service";

@Component({
  selector: 'pharos-do-browser',
  templateUrl: './do-browser.component.html',
  styleUrls: ['./do-browser.component.scss']
})
export class DoBrowserComponent extends DynamicPanelComponent implements OnInit {

  @Input() disease: Disease;
  constructor(
    private changeRef: ChangeDetectorRef,
    public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }

  ngOnInit() {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.disease = this.data.diseases;
        this.changeRef.markForCheck();
      });
  }

}

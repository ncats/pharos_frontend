import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Ligand} from '../../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";

/**
 * displays description of ligand
 */
@Component({
  selector: 'pharos-ligand-description',
  templateUrl: './ligand-description.component.html',
  styleUrls: ['./ligand-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigandDescriptionComponent extends DynamicPanelComponent implements OnInit {
  /**
   * ligand description
   */
  description: string;

  /**
   * ligand object
   */
  @Input() ligand: Ligand;

  constructor(
    private changeRef: ChangeDetectorRef,
    public navSectionsService: NavSectionsService
  ) {
    super(navSectionsService);
  }

  /**
   * set data
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data && this.data.ligands) {
          this.ligand = this.data.ligands;
          this.changeRef.markForCheck();
        }
      });
  }
}

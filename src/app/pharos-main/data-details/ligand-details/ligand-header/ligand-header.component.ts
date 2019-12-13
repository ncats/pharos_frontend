import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Ligand} from '../../../../models/ligand';
import {takeUntil} from 'rxjs/operators';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';

/**
 * displays ligand header component
 */
@Component({
  selector: 'pharos-ligand-header',
  templateUrl: './ligand-header.component.html',
  styleUrls: ['./ligand-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LigandHeaderComponent extends DynamicPanelComponent implements OnInit{
  /**
   * ligand to be displayed
   */
  @Input() ligand: Ligand;

  /**
   * no args constructor
   */
  constructor(
    private changeRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
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

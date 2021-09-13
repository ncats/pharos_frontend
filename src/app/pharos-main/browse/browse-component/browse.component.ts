import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../../../pharos-services/dynamic-services.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Facet } from 'src/app/models/facet';
import {takeUntil} from 'rxjs/operators';
import {CentralStorageService} from '../../../pharos-services/central-storage.service';

@Component({
  selector: 'pharos-browse-component',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent extends DynamicPanelComponent implements OnInit {

  term = '';
  Facet = Facet;
  visibleEntries: any[] = [];
  constructor(public dynamicServices: DynamicServicesService,
              private _route: ActivatedRoute, private router: Router,
              public centralStorageService: CentralStorageService,
              private changeRef: ChangeDetectorRef) {
    super(dynamicServices);
  }

  ngOnInit(): void {

    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialize();
        }
      });
    this.initialize();
  }

  initialize() {
    this.term = this._route.snapshot.queryParamMap.get('q');
    this.visibleEntries = this.data.browse.entries;
    this.centralStorageService.browseTypesChanged.subscribe(types => {
      if (types.length === 0) {
        this.visibleEntries = this.data.browse.entries;
      } else {
        this.visibleEntries = this.data.browse.entries?.filter(e => types.includes(e.entityType));
      }
    });
  }

  getIcon(entry: any) {
    switch (entry.entityType) {
      case 'Target':
        return 'track_changes';
      case 'Ligand':
        return 'medication';
      case 'Disease':
        return 'coronavirus';
    }
    return 'help';
  }

  getFilterName(entityType: string) {
    return entityType.split(':')[0];
  }

  truncate(text: string, length: number) {
    if (!text || text.length === 0 || this.term.length === 0) {
      return '';
    }
    const index = text.toLowerCase().indexOf(this.term.toLowerCase());
    const start = Math.max(index - length / 2, 0);
    let blurb = text.substr(start, length).trim();
    const regex = new RegExp(this.term, 'gi');
    blurb = blurb.replace(regex, (match) => {
        return '<b>' + match + '</b>'  ;
      }
    );
    let ret = '';
    if (start > 0) {
      ret += '... ';
    }
    ret += blurb;
    if ((start + length) < text.length) {
      ret += ' ...';
    }
    return ret;
  }

}

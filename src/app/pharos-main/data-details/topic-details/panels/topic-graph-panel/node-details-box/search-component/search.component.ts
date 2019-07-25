import {Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {finalize, tap} from 'rxjs/operators';
import {DiseaseNode} from '../../models/topic-graph/disease-node';
import {LigandNode} from '../../models/topic-graph/ligand-node';
import {TargetNode} from '../../models/topic-graph/target-node';
import {GraphDataService} from 'smrtgraph-core';


@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
@Output()
  public selected: EventEmitter<Node> = new EventEmitter();
  searchForm: FormGroup;
  options: any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    @Inject(GraphDataService) private graphDataService
  ) {  }


  /**
   *add placeholder string if required
   * set up subscription for input value changes
   * // todo: should unsubscribe
   */
  ngOnInit() {
    console.log(this);
    this.searchForm = this.fb.group({
      typeaheadInput: null
    });

    this.searchForm
      .get('typeaheadInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(term => {
          return this.graphDataService.searchNodes(term.name ? term.name : term)
              .pipe(
                finalize(() => this.isLoading = false),
              );
          }
        ))
      .subscribe(res => {
        this.options = res;
      });
  }

  displayFn(node?: TargetNode | DiseaseNode | LigandNode ): string | undefined {
    return node ? node.name : undefined;
  }


  search() {
    this.selected.emit(this.searchForm.get('typeaheadInput').value);
  }
}

import {Injectable, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {CentralStorageService} from "../../../pharos-services/central-storage.service";

/**
 * retrieves and passes data from config to the help panel
 */
@Injectable({
  providedIn: 'root'
})
export class HelpDataService {

  /**
   * use setter to keep data updated
   * @param value
   */
  @Input()
  set data(value: any) {
    this._data.next(value);
  }

  /**
   * retrieve subject value to keep data up to date
   * @returns {any}
   */
  get data() {
    return this._data.getValue();
  }
  set predictionDetails(predictionDetails) {
    this._predictionDetails = predictionDetails || [];
  }
  get predictionDetails() {
    return this._predictionDetails;
  }

  /**
   * subscribe to api data changes
   * @param {PharosApiService} pharosApiService
   */
  constructor(
    private pharosApiService: PharosApiService,
    private centralStorageService: CentralStorageService
  ) {}

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _data = new BehaviorSubject<any>(null);
  _predictionDetails: any[] = [];

  /**
   * RxJs subject to broadcast help panel data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _helpDataSource = new BehaviorSubject<any>(null);

  /**
   * Observable stream of help panel data changes
   * @type {Observable<boolean>}
   */
  data$ = this._helpDataSource.asObservable();

  /**
   * RxJs subject to broadcast help panel data changes
   * @type {Subject<boolean>}
   * @private
   */
  private _helpDescriptionSource = new BehaviorSubject<any>({});

  /**
   * Observable stream of help panel data changes
   * @type {Observable<boolean>}
   */
  sources$ = this._helpDescriptionSource.asObservable();

  /**
   * field called by the service
   */
  field: string;

  /**
   * readable label for the field
   */
  label: string;

  versions: any[] = [];

  /**
   * set data origin
   * pass description and data to subscribers
   * @param {string} field
   */
  setOrigin(field: string): void {
    this.field = field;
    const payload = this.centralStorageService.sourcesMap.get(field);
    this._helpDescriptionSource.next(payload);
 //   this._helpDataSource.next(this.data[this.field]);
  }
  setVersions(versions: any[]) {
    this.versions = versions;
  }

  /**
   * save sources in the sources map
   * @param {string} field
   * @param sources
   */
  setSources(field: string, sources: any): void {
    this.centralStorageService.sourcesMap.set(field, sources);
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID, Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {Target} from '../../../../../models/target';
import {BreakpointObserver} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {Router} from '@angular/router';
import {CentralStorageService} from '../../../../../pharos-services/central-storage.service';

/**
 * displays amino acid sequence data
 * contains bar chart of amino acid counts
 * amino acid sequence
 * protvista viewer - browser only
 */
@Component({
  selector: 'pharos-aa-sequence-panel',
  templateUrl: './aa-sequence-panel.component.html',
  styleUrls: ['./aa-sequence-panel.component.scss', './molstar.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AaSequencePanelComponent extends DynamicPanelComponent implements OnInit {
  /**
   * target to display
   */
  @Input() target: Target;
  /**
   * div element that holds the protvista viewer
   */
  @ViewChild('protVistaViewer', {static: true}) viewerContainer: ElementRef;

  /**
   * amino acid residue counts
   */
  residueCounts: any[];
  expectedResidueCounts: any[];

  /**
   * set up active sidenav component
   * @param breakpointObserver
   * @param navSectionsService
   * @param changeRef
   */
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private changeRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformID: any,
    public dynamicServices: DynamicServicesService,
    private centralStorageService: CentralStorageService) {
    super(dynamicServices);
  }

  /**
   *    * count and parse sequence
   * initialize protvista viewer
   * set up data change subscription
   */
  ngOnInit() {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 768px)');
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        if (this.target.sequence) {
          this.getCounts();
        }
        if (!this.isSmallScreen && isPlatformBrowser(this.platformID)) {
          const childElements = this.viewerContainer.nativeElement.childNodes;
          for (const child of childElements) {
            this.renderer.removeChild(this.viewerContainer.nativeElement, child);
          }
          import('ncats-protvista-uniprot').then(res => {
            // tslint:disable-next-line:no-unused-expression
            window.customElements.get('protvista-uniprot') || window.customElements.define('protvista-uniprot', res.default);
            const viewer = this.renderer.createElement('protvista-uniprot');
            viewer.setAttribute('accession', this.target.accession);
            this.viewerContainer.nativeElement.appendChild(viewer);
            this.scrollWhenComplete(viewer);
          });
        }
        this.loadingComplete();
        this.changeRef.markForCheck();
      });

  }

  private scrollWhenComplete(viewer) {
    const interval = window.setInterval(checkProtVistaIsLoading.bind(this), 100);

    function checkProtVistaIsLoading() {
      if (!viewer.loading) {
        clearInterval(interval);
        setTimeout(() => {
          this.loadingComplete();
        }, 300);
      }
    }
  }

  /**
   * get counts of each amino acid
   * used for bar chart
   */
  getCounts(): void {
    const charMap: Map<string, number> = new Map<string, number>();
    const len = this.target.sequence.length;
    const order = ['L', 'S', 'E', 'A', 'G', 'P', 'V', 'K', 'R', 'T',
      'Q', 'D', 'I', 'F', 'N', 'Y', 'H', 'C', 'M', 'W'];
    order.forEach(aa => charMap.set(aa, 0));
    this.target.sequence.split('').map(char => {
      let count = charMap.get(char);
      charMap.set(char, ++count);
    });
    this.residueCounts = Array.from(charMap.entries());
    this.expectedResidueCounts = [
      ['L', 0.099591165 * len],
      ['S', 0.083248996 * len],
      ['E', 0.071040797 * len],
      ['A', 0.07017658 * len],
      ['G', 0.065741325 * len],
      ['P', 0.063110442 * len],
      ['V', 0.05966869 * len],
      ['K', 0.057261837 * len],
      ['R', 0.056425217 * len],
      ['T', 0.053570831 * len],
      ['Q', 0.047705615 * len],
      ['D', 0.047388773 * len],
      ['I', 0.043342517 * len],
      ['F', 0.03647334 * len],
      ['N', 0.035849413 * len],
      ['Y', 0.026661623 * len],
      ['H', 0.026235711 * len],
      ['C', 0.023004718 * len],
      ['M', 0.021316185 * len],
      ['W', 0.012186227 * len]
    ];
  }

  goToSequenceSearch(){
    this.centralStorageService.setField('sequence', this.target.sequence);
    this.router.navigate(['/sequence']);
  }

  getLongFormName(shortFormName: string): string{
    return AaSequencePanelComponent.getLongFormName(shortFormName);
  }

  static getLongFormName(shortFormName: string): string {
    switch (shortFormName) {
      case 'A':
        return 'Alanine';
      case 'R':
        return 'Arginine';
      case 'N':
        return 'Asparagine';
      case 'D':
        return 'Aspartate';
      case 'C':
        return 'Cysteine';

      case 'E':
        return 'Glutamate';
      case 'Q':
        return 'Glutamine';
      case 'G':
        return 'Glycine';
      case 'H':
        return 'Histidine';
      case 'I':
        return 'Isoleucine';

      case 'L':
        return 'Leucine';
      case 'K':
        return 'Lysine';
      case 'M':
        return 'Methionine';
      case 'F':
        return 'Phenylalanine';
      case 'P':
        return 'Proline';

      case 'S':
        return 'Serine';
      case 'T':
        return 'Threonine';
      case 'W':
        return 'Tryptophan';
      case 'Y':
        return 'Tyrosine';
      case 'V':
        return 'Valine';
    }
  }

}

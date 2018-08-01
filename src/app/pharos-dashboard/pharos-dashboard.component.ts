import {Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Topic} from '../models/topic';

@Component({
  selector: 'pharos-pharos-dashboard',
  templateUrl: './pharos-dashboard.component.html',
  styleUrls: ['./pharos-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PharosDashboardComponent implements OnInit {
  @ViewChild('details', {read: ElementRef}) elemRef: ElementRef;
  topics: any;
  position: string;
  animationState = 'out';

  constructor() {
  }

  ngOnInit() {
    this.topics = [
      {
        id: 2,
        name: 'Kinase: IDG Consortium (Targets)',
        description: '',
        class: 'disease',
        diseaseCt: 1,
        ligandCt: 4,
        targetCt: 5,
        publicationCt: 0
      }, {
        id: 3,
        name: 'Regulation of Autophagy',
        description: 'Any process that modulates the frequency, rate or extent of autophagy. ' +
        'Autophagy is the process in which cells digest parts of their own cytoplasm. [GOC:dph, GOC:tb] [GO]',
        url: 'targets/search?facet=GO+Process/regulation%20of%20autophagy&top=100',
        class: 'target',
        diseaseCt: 53,
        ligandCt: 5161,
        targetCt: 50,
        publicationCt: 0
      }, {
        id: 4,
        name: 'GPCR: Class F frizzled-type',
        description: 'A family of seven-pass transmembrane cell-surface proteins that combines with LOW DENSITY ' +
        'LIPROTEIN RECEPTOR-RELATED PROTEIN-5 or LOW DENSITY LIPROTEIN RECEPTOR-RELATED PROTEIN-5 to form receptors ' +
        'for WNT PROTEINS. Frizzled receptors often couple with HETEROTRIMERIC G PROTEINS and regulate the WNT ' +
        'SIGNALING PATHWAY.',
        class: 'targets',
        url: 'targets/search?facet=IDG+Target+Family/GPCR&facet=DTO+Protein+Class+%281%29/Class+F+frizzled-type',
        diseaseCt: 10,
        ligandCt: 234,
        targetCt: 11,
        publicationCt: 0
      }, {
        id: 5,
        name: 'WD40 repeat domain proteins',
        description: 'The WD40 repeat (also known as the WD or beta-transducin repeat) is a short structural motif of ' +
        'approximately 40 amino acids, often terminating in a tryptophan-aspartic acid (W-D) dipeptide.[2] Tandem copies' +
        ' of these repeats typically fold together to form a type of circular solenoid protein domain called the WD40 ' +
        'domain.',
        class: 'targets',
        url: 'targets/search?facet=UniProt+Keyword/WD+repeat&top=300',
        displayTargets: {
          mostKnowledge: 'LRRK2',
          mostPotential: 'GNB3',
          leastKnowledge: 'CDC20B'
        },
        diseaseCt: 108,
        ligandCt: 497,
        targetCt: 277,
        publicationCt: 0
      }
    ];
  }

  goToDetails(): void {
    this.elemRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  /**
   * method that checks to see if the user has scrolled past a certain point. pinned to the window object
   * @returns void
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // todo: work around window api for angular universal
    if (window.pageYOffset > 64 || document.documentElement.scrollTop > 64 || document.body.scrollTop > 64) {
      this.animationState = 'in';
    } else if (this.position && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 64) {
      this.animationState = 'out';
    }
  }

}

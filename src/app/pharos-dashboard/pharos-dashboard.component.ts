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
      new Topic({
        id: 1,
        name: 'Bromodomain Inhibitors',
        description: 'BET inhibitors are a class of drugs with anti-cancer, immunosuppressive, and other effects in ' +
        'clinical trials in the United States and Europe and widely used in research. These molecules reversibly bind ' +
        'the bromodomains of Bromodomain and Extra-Terminal motif (BET) proteins BRD2, BRD3, BRD4, and BRDT, and prevent ' +
        'protein-protein interaction between BET proteins and acetylated histones and transcription factors.',
        class: 'target',
        diseaseCt: 59,
        ligandCt: 818,
        targetCt: 4,
        publicationCt: 0
      }),
      new Topic({
        id: 2,
        name: 'Lysomal Storage Disorders',
        description: 'Just relax and let it flow. That easy. This is your world. Everybody needs a friend. ' +
        'Don\'t be bashful drop me a line. We don\'t want to set these clouds on fire. Just use the old one inch brush.' +
        'Any little thing can be your friend if you let it be. Talent is a pursued interest. That is to say, anything you' +
        ' practice you can do. Now we\'ll take the almighty fan brush. If you\'ve been in Alaska less than a ' +
        'year you\'re a Cheechako.' +
        ' These trees are so much fun. I get started on them and I have a hard time stopping. We spend so much of our ' +
        'life looking - but never seeing. But we\'re not there yet, so we don\'t need to worry about it. ' +
        'It\'s so important to do something every day that will make you happy. You got your heavy coat out yet? ' +
        'It\'s getting colder. Do an almighty painting with us. We don\'t really know where this goes -' +
        'and I\'m not sure we really care.',
        class: 'disease',
        diseaseCt: 0,
        ligandCt: 45,
        targetCt: 45,
        publicationCt: 45
      }),
      new Topic({
        id: 3,
        name: 'Cystic Fibrosis',
        description: 'Maybe there\'s a happy little waterfall happening over here. In life you need colors. ' +
        'Decide where your cloud lives. Maybe he lives right in here. I can\'t think of anything more rewarding than being ' +
        'able to express yourself to others through painting. I\'m sort of a softy, I couldn\'t shoot Bambi except with a camera. ' +
        'All you need to paint is a few tools, a little instruction, and a vision in your mind. ' +
        'This is a happy place, little squirrels live here and play. Now then, let\'s play. Poor old tree. ' +
        'Let your imagination be your guide. Fluff it up a little and hypnotize it. Trees get lonely too, ' +
        'so we\'ll give him a little friend. ' +
        'Let\'s make a happy little mountain now. We\'ll play with clouds today.',
        class: 'disease',
        diseaseCt: 0,
        ligandCt: 4,
        targetCt: 5,
        publicationCt: 12
      }), new Topic({
        id: 4,
        name: 'Cystic Fibrosis',
        description: 'Maybe there\'s a happy little waterfall happening over here. In life you need colors. ' +
        'Decide where your cloud lives. Maybe he lives right in here. I can\'t think of anything more rewarding than being ' +
        'able to express yourself to others through painting. I\'m sort of a softy, I couldn\'t shoot Bambi except with a camera. ' +
        'All you need to paint is a few tools, a little instruction, and a vision in your mind. ' +
        'This is a happy place, little squirrels live here and play. Now then, let\'s play. Poor old tree. ' +
        'Let your imagination be your guide. Fluff it up a little and hypnotize it. Trees get lonely too, ' +
        'so we\'ll give him a little friend. ' +
        'Let\'s make a happy little mountain now. We\'ll play with clouds today.',
        class: 'disease',
        diseaseCt: 0,
        ligandCt: 4,
        targetCt: 5,
        publicationCt: 12
      })
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

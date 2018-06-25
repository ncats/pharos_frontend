import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Topic} from '../models/topic';

@Component({
  selector: 'pharos-pharos-dashboard',
  templateUrl: './pharos-dashboard.component.html',
  styleUrls: ['./pharos-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PharosDashboardComponent implements OnInit {
  topics: any;

  constructor() {
  }

  ngOnInit() {
    this.topics = [
      new Topic({
        name: 'Bromodomain Inhibitors',
        description: 'Imagination is the key to painting. Just let your mind wander and enjoy. This should make you happy.' +
        ' Isn\'t it great to do something you can\'t fail at? Nature is so fantastic, enjoy it. Let it make you happy. ' +
        'You\'re the greatest thing that has ever been or ever will be. You\'re special. You\'re so very special. ' +
        'I\'m gonna start with a little Alizarin crimson and a touch of Prussian blue In this world, everything can be happy. ' +
        'Trees get lonely too, so we\'ll give him a little friend. This is your world, whatever makes you happy you can put in it. ' +
        'Go crazy. Put your feelings into it, your heart, it\'s your world. Even the worst thing we can do here is good.' +
        ' Don\'t fiddle with it all day. The very fact that you\'re aware of suffering is enough reason to be overjoyed that ' +
        'you\'re alive and can experience it. You have freedom here. The only guide is your heart. ' +
        'We don\'t want to set these clouds on fire. Let your imagination be your guide.',
        class: 'target',
        diseaseCt: 45,
        ligandCt: 43,
        targetCt: 0,
        publicationCt: 25
      }),
      new Topic({
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
}

import { trigger, state, style, transition,
  animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('in', style({
      'background-color': 'whitesmoke',
      'color': 'black'
})),
    state('out', style({
      'background-color': 'transparent',
      'position': 'fixed',
      'z-index': '666',
      'color': 'white'
    })),
    transition('in => out', [group([
      animate('300ms ease-out')
      ]
    )]),
    transition('out => in', [group([
        animate('300ms ease-in')
      ]
    )])
  ]),
]

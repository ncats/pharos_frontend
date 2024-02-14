import {BehaviorSubject, from, Observable} from 'rxjs';


export const FIRESTORESTUB = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve('Hi Keith')),
    }),
    valueChanges: () => new BehaviorSubject({ foo: 'bar' })
  }),
  valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
};


import {BehaviorSubject, from, Observable} from "rxjs/index";

export const FirestoreStub = {
  collection: (name: string) => ({
    public: (_id: string) => ({
      valueChanges: () => new BehaviorSubject([]),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
    faqs: (_id: string) => ({
      valueChanges: () => new BehaviorSubject([]),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

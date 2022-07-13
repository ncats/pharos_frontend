import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpressionInfoService {

  constructor() { }

  tissueInfo: Map<string, any> = new Map<string, any>();
  focusedUberon: {uid: string, name: string, source: string};
  @Output() focusedUberonChanged = new EventEmitter<{uid: string, name: string, source: string}>();

  setFocusedTissue(name, source) {
    const uberonObj = this.get(name);
    if (uberonObj.uid) {
      this.setFocusedUberon(uberonObj.uid, source);
    }
  }
  setFocusedUberon(uid, source) {
    const cleanUid = this.cleanKey(uid);
    if (!this.focusedUberon) {
      this.focusedUberon = {...this.get(cleanUid), source: source};
    } else {
      if (cleanUid === this.focusedUberon.uid) {
        this.focusedUberon = null;
      } else {
        this.focusedUberon = {...this.get(cleanUid), source: source};
      }
    }
    this.focusedUberonChanged.emit(this.focusedUberon);
  }

  cleanKey(key: string) {
    return key.replace(':', '_');
  }
  get (key: string) {
    return this.tissueInfo.get(this.cleanKey(key));
  }
  trySet (data: { uid: string, name: string }) {
    const cleanUberon = this.cleanKey(data.uid);
    let updated = false;
    if (!this.tissueInfo.has(cleanUberon)) {
      this.tissueInfo.set(cleanUberon, {...data, uid: cleanUberon});
      updated = true;
    }
    if (!this.tissueInfo.has(data.name)) {
      this.tissueInfo.set(data.name, {...data, uid: cleanUberon});
      updated = true;
    }
    return updated;
  }
}

import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export class Alert {
  id: string;
  type: AlertType;
  message: string;
  affectsProd: boolean;
  autoClose: boolean;
  keepAfterRouteChange: boolean;
  fade: boolean;
  expireTime: Date;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }

  static parse(obj: any): Alert {
    const retObj: any = {};
    retObj.type = AlertType[obj.level];
    if (!retObj.type) {
      return null;
    }
    if (obj.endTime) {
      retObj.expireTime = new Timestamp(obj.endTime.seconds, obj.endTime.nanoseconds).toDate();
    }
    retObj.message = obj.message;
    return new Alert(retObj);
  }
}

export enum AlertType {
  Success = 'Success',
  Error = 'Error',
  Info = 'Info',
  Warning = 'Warning'
}

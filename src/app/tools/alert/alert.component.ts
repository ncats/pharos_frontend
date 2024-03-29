import {Component, OnInit, OnDestroy, Input, Inject, PLATFORM_ID} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {Alert, AlertType} from '../../models/alert';
import {AlertService} from '../../pharos-services/alert.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {environment} from '../../../environments/environment';
import {takeUntil} from 'rxjs/operators';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  selector: 'pharos-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();
  @Input() id = 'default-alert';
  @Input() fade = true;
  dbSubscription: Subscription;

  alerts: Alert[] = [];
  isProd = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private db: AngularFirestore,
    @Inject(PLATFORM_ID) private platformID: any
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      this.isProd = environment.production;
      // subscribe to new alert notifications
      this.alertService.onAlert(this.id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(alert => {
          // clear alerts when an empty alert is received
          if (!alert.message) {
            // filter out alerts without 'keepAfterRouteChange' flag
            this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

            // remove 'keepAfterRouteChange' flag on the rest
            this.alerts.forEach(x => delete x.keepAfterRouteChange);
            return;
          }

          if (!this.isProd || alert.affectsProd) {
            if (!alert.expireTime || (alert.expireTime > new Date())) {
              // add alert to array
              this.alerts.push(alert);
            }
          }

          // auto close alert if required
          if (alert.autoClose) {
            setTimeout(() => this.removeAlert(alert), 3000);
          }
        });

      // clear alerts on location change
      this.router.events
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(event => {
          if (event instanceof NavigationStart) {
            this.alertService.clear(this.id);
          }
        });

      // @ts-ignore
      this.dbSubscription = this.db.collection<any>('alerts').valueChanges()
        .subscribe(alerts => {
          this.alertService.clear(this.id);
          // create and map questions by subject
          if (alerts) {
            alerts.forEach(alert => {
              const A = Alert.parse(alert);
              if (A) {
                this.alertService.alert(A);
              }
            });
          }
        });
    }
  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) {
      return;
    }

    if (this.fade) {
      // fade out alert
      this.alerts.find(x => x === alert).fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    const classes = ['pharos-alert', 'alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    if (this.dbSubscription) {
      this.dbSubscription.unsubscribe();
    }
  }
}

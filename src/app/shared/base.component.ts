import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

export class BaseComponent implements OnDestroy {
  public subscription: Set<Subscription> = new Set();

  public ngOnDestroy (): void {
    this.subscription.forEach((data) => {
      if (_.isNil(data) || !_.isFunction(data.unsubscribe)) {
        return;
      }
      data.unsubscribe();
    });
    this.subscription.clear();
  }

  public subscribe (sub: Subscription): void {
    this.subscription.add(sub);
  }
}

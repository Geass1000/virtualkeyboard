import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import * as Interfaces from '../interfaces';

@Directive({
  selector: '[appClickDelegate]'
})
export class ClickDelegateDirective {
  @Output('dClick')
  dClickEE: EventEmitter<Interfaces.ClickDelegateEvent> = new EventEmitter();

  @Input('tagSelector')
  set inTagSelector (value: string) {
    this.tagSelector = _.isNil(value)
      ? null : value;
  }
  private tagSelector: string;

  /**
   * Handles window Key Up events. Emits event to internal data "KeyUp" flow.
   *
   * @param   {KeyboardEvent} event
   * @returns {void}
   */
  @HostListener('click', [ '$event' ])
  onKeyUp (
    event: MouseEvent,
  ): void {
    if (_.isNil(event) || _.isNil(event.target)) {
      throw new Error('Event target does not exist!');
    }

    if (_.isNil(this.tagSelector)) {
      this.dClickEE.emit({
        id: null,
        type: null,
        event: event,
      });
      return;
    }

    const el: Element = (event.target as Element).closest(this.tagSelector);

    if (_.isNil(el)) {
      return;
    }

    const id: string = el.getAttribute('data-id');
    const type: string = el.getAttribute('data-type');

    this.dClickEE.emit({
      id: id,
      type: type,
      event: event,
    });
  }
}

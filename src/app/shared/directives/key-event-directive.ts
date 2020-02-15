import { Directive, Output, HostListener, OnInit, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';
import * as _ from 'lodash';

import { BaseComponent } from '../base.component';

@Directive({
  selector: '[appKeyEvent]'
})
export class KeyEventDirective extends BaseComponent implements OnInit {
  @Output('keyUp')
  keyUpEE: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output('keyDown')
  keyDownEE: EventEmitter<KeyboardEvent> = new EventEmitter();

  private keyUpSubject: Subject<KeyboardEvent>;
  private keyDownSubject: Subject<KeyboardEvent>;

  ngOnInit (
  ): void {
    this.keyUpSubject = new Subject();
    this.keyDownSubject = new Subject();

    // Emit Key Up output event
    const keyUp$ = this.keyUpSubject
      .pipe(
        distinctUntilKeyChanged('code'),
      )
      .subscribe((event) => {
        // Skip sticking of key
        if (_.isNil(event.code)) {
          return;
        }
        this.keyUpEE.emit(event);

        // Reject sticking of key
        this.keyDownSubject.next({ code: null } as KeyboardEvent);
      });
    this.subscribe(keyUp$);

    // Emit Key Down output event
    const keyDown$ = this.keyDownSubject
      .pipe(
        distinctUntilKeyChanged('code'),
      )
      .subscribe((event) => {
        // Skip sticking of key
        if (_.isNil(event.code)) {
          return;
        }
        this.keyDownEE.emit(event);

        // Reject sticking of key
        this.keyUpSubject.next({ code: null } as KeyboardEvent);
      });
    this.subscribe(keyDown$);
  }

  /**
   * Handles window Key Up events. Emits event to internal data "KeyUp" flow.
   *
   * @param   {KeyboardEvent} event
   * @returns {void}
   */
  @HostListener('window:keyup', [ '$event' ])
  onKeyUp (
    event: KeyboardEvent,
  ): void {
    this.keyUpSubject.next(event);
  }

  /**
   * Handles window Key Down events. Emits event to internal data "KeyDown" flow.
   *
   * @param   {KeyboardEvent} event
   * @returns {void}
   */
  @HostListener('window:keydown', [ '$event' ])
  onKeyDown (
    event: KeyboardEvent,
  ): void {
    this.keyDownSubject.next(event);
  }
}

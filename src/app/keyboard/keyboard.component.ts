import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import * as Enums from '../shared/enums';
import * as Constants from '../shared/constants';
import * as Interfaces from '../shared/interfaces';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  private pressedKeysMap: Map<string, boolean>;
  public pressedKeysList: string[];

  public keyboardLayout = Constants.KeyboardLayout;

  ngOnInit (): void {
    this.pressedKeysMap = new Map();
    this.updateListOfPressedKeys();
  }

  /**
   * Handles clicks of `Click Delegate` events for key buttons.
   *
   * @param   {Interfaces.ClickDelegateEvent} data
   * @returns {void}
   */
  onClickKeyboardLayoutElement (
    data: Interfaces.ClickDelegateEvent,
  ): void {
    const prevStateOfKey = this.pressedKeysMap.get(data.id);

    if (_.isNil(prevStateOfKey) || prevStateOfKey === false) {
      this.pressedKeysMap.set(data.id, true);
    } else {
      this.pressedKeysMap.set(data.id, false);
    }

    this.updateListOfPressedKeys();
  }

  /**
   * Handles window Key Up event.
   *
   * @param   {KeyboardEvent} event
   * @returns {void}
   */
  onKeyUp (
    event: KeyboardEvent,
  ): void {
    this.pressedKeysMap.set(event.code, false);
    event.preventDefault();
    this.updateListOfPressedKeys();
  }

  /**
   * Handles window Key Down event.
   *
   * @param   {KeyboardEvent} event
   * @returns {void}
   */
  onKeyDown (
    event: KeyboardEvent,
  ): void {
    this.pressedKeysMap.set(event.code, true);
    event.preventDefault();
    this.updateListOfPressedKeys();
  }

  /**
   * Updates list of pressed keys.
   *
   * @returns {void}
   */
  updateListOfPressedKeys (
  ): void {
    const pressedKeys = [];

    this.pressedKeysMap.forEach((value, key) => {
      if (value === true) {
        pressedKeys.push(key);
      }
    });

    this.pressedKeysList = pressedKeys;
  }

  /**
   * Returns true if key is in list of pressed keys.
   *
   * @param   {KeyboardEInterfaces.KeyboardLayoutElementvent} keyboardLayoutElement
   * @returns {boolean}
   */
  isActiveKeyElement (
    keyboardLayoutElement: Interfaces.KeyboardLayoutElement,
  ): boolean {
    const elementIsInListOfPressedKeys = _.includes(
      this.pressedKeysList,
      keyboardLayoutElement.key,
    );
    return elementIsInListOfPressedKeys;
  }

  /**
   * Converts point value to pix.
   *
   * @param   {number} sizeInPoint
   * @returns {number}
   */
  convertPointToPix (
    sizeInPoint: number,
  ): number {
    const sizeInPix = sizeInPoint * Constants.PixInPoint;
    return sizeInPix;
  }

  /**
   * Converts point value from field of Keyboard Layout Element to pix.
   *
   * @param   {Interfaces.KeyboardLayoutElement} keyboardLayoutElement
   * @param   {string} fieldPath
   * @returns {number}
   */
  converFieldFromPointToPix (
    keyboardLayoutElement: Interfaces.KeyboardLayoutElement,
    fieldPath: string,
  ): number {
    const sizeInPoint = _.get(keyboardLayoutElement, fieldPath);
    const sizeInPix = this.convertPointToPix(sizeInPoint);
    return sizeInPix;
  }

  /**
   * Returns left position of key button in pix.
   *
   * @param   {Interfaces.KeyboardLayoutElement} keyboardLayoutElement
   * @returns {number}
   */
  getLeftPositionInPix (
    keyboardLayoutElement: Interfaces.KeyboardLayoutElement,
  ): number {
    const sizeInPix = this.converFieldFromPointToPix(
      keyboardLayoutElement,
      'position.x',
    );
    return sizeInPix;
  }

  /**
   * Returns top position of key button in pix.
   *
   * @param   {Interfaces.KeyboardLayoutElement} keyboardLayoutElement
   * @returns {number}
   */
  getTopPositionInPix (
    keyboardLayoutElement: Interfaces.KeyboardLayoutElement,
  ): number {
    const sizeInPix = this.converFieldFromPointToPix(
      keyboardLayoutElement,
      'position.y',
    );
    return sizeInPix;
  }

  /**
   * Returns width of key button in pix.
   *
   * @param   {Interfaces.KeyboardLayoutElement} keyboardLayoutElement
   * @returns {number}
   */
  getWidthInPix (
    keyboardLayoutElement: Interfaces.KeyboardLayoutElement,
  ): number {
    const sizeInPix = this.converFieldFromPointToPix(
      keyboardLayoutElement,
      'size.width',
    );
    return sizeInPix;
  }

  /**
   * Returns height of key button in pix.
   *
   * @param   {Interfaces.KeyboardLayoutElement} keyboardLayoutElement
   * @returns {number}
   */
  getHeightInPix (
    keyboardLayoutElement: Interfaces.KeyboardLayoutElement,
  ): number {
    const sizeInPix = this.converFieldFromPointToPix(
      keyboardLayoutElement,
      'size.height',
    );
    return sizeInPix;
  }

  /**
   * Returns key of keyboard layout element as unique identifier.
   *
   * @param   {number} index
   * @param   {Interfaces.KeyboardLayoutElement} keyboardLayoutElement
   * @returns {Enums.KeyCode}
   */
  trackByKey (
    index: number,
    keyboardLayoutElement: Interfaces.KeyboardLayoutElement,
  ): Enums.KeyCode {
    return keyboardLayoutElement.key;
  }
}

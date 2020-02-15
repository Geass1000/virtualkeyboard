import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import * as Constants from '../shared/constants';
import * as Interfaces from '../shared/interfaces';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  @Input('pressedKeys')
  set inPressedKeys (value: string[]) {
    if (_.isNil(value)) {
      this.pressedKeys = [];
    }

    this.pressedKeys = value;
  }
  private pressedKeys: string[];

  public keyboardLayout = Constants.KeyboardLayout;

  constructor () { }

  ngOnInit (): void {
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
      this.pressedKeys,
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
}

import * as Enums from './enums';

export interface KeyboardLayoutElementPosition {
  x: number;
  y: number;
}

export interface KeyboardLayoutElementSize {
  width: number;
  height: number;
}

export interface KeyboardLayoutElement {
  key: Enums.KeyCode;
  position: KeyboardLayoutElementPosition;
  size: KeyboardLayoutElementSize;
}

export interface ClickDelegateEvent {
  id?: string;
  type?: string;
  event: MouseEvent;
}

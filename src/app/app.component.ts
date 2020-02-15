import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private pressedKeysMap: Map<string, boolean>;
  public pressedKeysList: string[];

  ngOnInit () {
    this.pressedKeysMap = new Map();
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
    console.log(`KeyUP`, event);
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
    console.log(`KeyDOWN`, event);
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
}

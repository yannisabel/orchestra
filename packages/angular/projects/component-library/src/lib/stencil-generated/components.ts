/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import { Components } from '@orchestra-kit/core';


@ProxyCmp({
  inputs: ['disabled', 'icon', 'iconLibrary', 'iconName', 'size', 'text', 'type', 'variant']
})
@Component({
  selector: 'orchestra-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'icon', 'iconLibrary', 'iconName', 'size', { name: 'text', required: true }, 'type', 'variant'],
  standalone: false
})
export class OrchestraButton {
  protected el: HTMLOrchestraButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OrchestraButton extends Components.OrchestraButton {}


@ProxyCmp({
  inputs: ['fill', 'library', 'name', 'size']
})
@Component({
  selector: 'orchestra-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['fill', 'library', { name: 'name', required: true }, 'size'],
  standalone: false
})
export class OrchestraIcon {
  protected el: HTMLOrchestraIconElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface OrchestraIcon extends Components.OrchestraIcon {}



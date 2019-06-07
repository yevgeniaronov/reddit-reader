import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TitleService {
  constructor() {}
  @Output() title: EventEmitter<string> = new EventEmitter();
}

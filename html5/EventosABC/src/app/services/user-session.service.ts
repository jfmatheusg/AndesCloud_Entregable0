import { Injectable } from '@angular/core';
@Injectable()
export class UserSessionService {
  profile: {};
  // tslint:disable-next-line:ban-types
  ok: Boolean = false;

  reset() {
    this.profile = {};
    this.ok = false;
  }
}

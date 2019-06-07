import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PageDataService {
  constructor(private http: HttpClient) {}
  private PageDataUrl = 'https://www.reddit.com/r/AskTechnology.json';

  getPosts(after?: string, before?: string) {
    return this.http
      .get(
        this.PageDataUrl +
          '?' +
          (after ? `after=${after}` : '') +
          (before ? `before=${before}` : '')
        // + '&count=10'  --> commented due to not working correctly, prevents 'back' button from working.
      )
      .pipe(
        catchError(error => {
          console.error(error); // TODO: error handling here
          return of(null);
        })
      );
  }
}

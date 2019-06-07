import { Component, HostListener, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PageDataService } from 'src/app/core/services/page-data.service';
import { TitleService } from 'src/app/core/services/title.service';
import { PostData } from 'src/app/shared/models/post-data.model';
import { timer } from 'rxjs';

class PageData {
  data: {
    before: string;
    after: string;
    children: PostData[];
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: PostData[];
  after: string;
  before: string;
  isLoading: boolean;

  constructor(
    private pageDataService: PageDataService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(after?: string, before?: string) {
    this.isLoading = true;
    this.pageDataService
      .getPosts(after, before)
      .pipe(
        map((pageData: PageData) => {
          this.after = pageData.data.after;
          this.before = pageData.data.before;
          const posts = pageData.data.children;

          // sets the title for the header
          this.titleService.title.emit(posts[0].data.subreddit);

          // creates a new Date object to be used instead of the milisecond date format
          for (const post of posts) {
            post.data.date = new Date(post.data.created_utc * 1000);
          }
          return posts;
        })
      )
      .subscribe({
        next: (posts: PostData[]) => {
          this.posts = posts;
        },
        error: error => {
          this.isLoading = false;
          console.error(error); // TODO: Error handling here
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}

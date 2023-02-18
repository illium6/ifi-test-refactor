import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnifiedBook } from '../interfaces/unified-book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BooksService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public books$: Observable<UnifiedBook[]> = this.booksService.getBooks();

  public constructor(
    private http: HttpClient,
    private booksService: BooksService
  ) {}

  // public getReadingTime(data: any): string {
  //   const started = this.getStartTime(data);
  //   const finished = this.getFinishTime(data);
  //
  //   return (
  //     (finished.getTime() - started.getTime()) / 1000 / 60 / 60 / 24 + ' дней'
  //   );
  // }

  public trackBy(index: number, item: any): number {
    return index;
  }
}

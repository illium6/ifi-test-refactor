import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnifiedBook } from '../interfaces/unified-book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ifi-test'

  public books$: Observable<UnifiedBook[]> = this.booksService.getBooks();

  public constructor(
    private http: HttpClient,
    private booksService: BooksService
  ) {}

  public trackBy(index: number, item: any): number {
    return index;
  }
}

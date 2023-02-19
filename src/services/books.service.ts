import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, merge, Observable } from 'rxjs';
import { UnifiedBook } from '../interfaces/unified-book';
import { BooksToUnifiedBooksWrapper } from '../wrappers/books-to-unified-books-wrapper';

@Injectable({ providedIn: 'root' })
export class BooksService {
  public constructor(private http: HttpClient) {}

  public getBooks(): Observable<UnifiedBook[]> {
    const books1 = this.http.get('/first-book-source') as Observable<any[]>;
    const books2 = this.http.get('/second-book-source') as Observable<any[]>;
    const books3 = this.http.get('/third-book-source') as Observable<any[]>;

    const wrapper: BooksToUnifiedBooksWrapper =
      new BooksToUnifiedBooksWrapper();

    let allBooks: UnifiedBook[] = [];

    return merge(books1, books2, books3).pipe(
      map((books: any[]) => wrapper.convert(books)),
      map((books: UnifiedBook[]) => (allBooks = allBooks.concat(books)))
    );
  }
}

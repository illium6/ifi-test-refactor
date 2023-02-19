import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, merge, Observable } from 'rxjs';
import { UnifiedBook } from '../interfaces/unified-book';
import { BooksToUnifiedBooksWrapper } from '../wrappers/books-to-unified-books-wrapper';
import { SourceWrapperFactory } from '../models/source-wrapper-factory';
import { BackendResponse } from '../interfaces/backend-response';

@Injectable({ providedIn: 'root' })
export class BooksService {
  public constructor(private http: HttpClient) {}

  public getBooks(): Observable<UnifiedBook[]> {
    const books1 = this.http.get<BackendResponse>('/first-book-source');
    const books2 = this.http.get<BackendResponse>('/second-book-source');
    const books3 = this.http.get<BackendResponse>('/third-book-source');

    // const wrapper: BooksToUnifiedBooksWrapper =
    //   new BooksToUnifiedBooksWrapper();

    let allBooks: UnifiedBook[] = [];

    return merge(books1, books2, books3).pipe(
      map((response: BackendResponse) =>
        SourceWrapperFactory.create(response.type).transform(response.books)
      ),
      // map((books: any[]) => wrapper.convert(books)),
      map((books: UnifiedBook[]) => (allBooks = allBooks.concat(books)))
    );
  }
}

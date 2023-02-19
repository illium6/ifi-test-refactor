import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BooksService } from './books.service';
import { finalize } from 'rxjs';
import {UnifiedBook} from "../interfaces/unified-book";

const bookStub = [
  {
    name: 'Масштабируемый рефакторинг',
    authors: {
      0: 'Мод Левер',
      length: 1,
    },
    started: 1657756800000,
    finished: 1658620800000,
    pagesDone: 192,
    totalPages: 192,
  },
];

describe('BooksService', () => {
  let booksService: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService],
    });
    httpMock = TestBed.inject(HttpTestingController);
    booksService = TestBed.inject(BooksService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('success create', () => {
    expect(booksService).toBeTruthy();
  });

  it('should get all books from backend', () => {
    booksService.getBooks().subscribe();

    const req1 = httpMock.expectOne('/first-book-source');
    const req2 = httpMock.expectOne('/second-book-source');
    const req3 = httpMock.expectOne('/third-book-source');

    req1.flush(bookStub);
    req2.flush(bookStub);
    req3.flush(bookStub);

    expect(req1.request.method).toBe('GET');
    expect(req2.request.method).toBe('GET');
    expect(req3.request.method).toBe('GET');
  });

  it('should output all given books', (done) => {
    let testBooks: UnifiedBook[];

    booksService
      .getBooks()
      .pipe(
        finalize(() => {
          expect(testBooks.length).toBe(6)
          done();
        })
      )
      .subscribe((books: UnifiedBook[]) => testBooks = books);

    const req1 = httpMock.expectOne('/first-book-source');
    const req2 = httpMock.expectOne('/second-book-source');
    const req3 = httpMock.expectOne('/third-book-source');

    req1.flush(bookStub);
    req2.flush(bookStub.concat(bookStub));
    req3.flush(bookStub.concat(bookStub, bookStub));
  });
});

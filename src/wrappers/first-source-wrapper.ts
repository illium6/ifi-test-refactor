import { AbstractSourceWrapper } from '../models/abstract-source-wrapper';
import { UnifiedBook } from '../interfaces/unified-book';

export class FirstSourceWrapper extends AbstractSourceWrapper {
  public transform(books: any[]): UnifiedBook[] {
    return books.map((book: any) => {
      const authors: string[] = book.authors || [book.author];

      return {
        title: book.name,
        authors,
        pagesDone: this.pagesToNumber(book.pages),
        pagesTotal: this.pagesToNumber(book.total),
        readingStarted: this.toDate(book.dateOfStart),
        readingFinished: this.toDate(book.dateOfEnd),
      };
    });
  }
}

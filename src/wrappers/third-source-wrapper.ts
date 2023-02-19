import { AbstractSourceWrapper } from '../models/abstract-source-wrapper';
import { UnifiedBook } from '../interfaces/unified-book';

export class ThirdSourceWrapper extends AbstractSourceWrapper {
  public transform(books: any[]): UnifiedBook[] {
    return books.map((book: any) => {
      const pagesDone = this.pagesToNumber(book.pagesDone);
      const pagesTotal = this.pagesToNumber(book.totalPages);
      const readingStarted = this.toDate(book.dateOfStart || book.started);
      const readingFinished = this.toDate(book.finished);

      return {
        title: book.name || book.title,
        authors: book.authors,
        pagesDone,
        pagesTotal,
        readingStarted,
        readingFinished,
        status: this.getStatus(pagesDone, pagesTotal),
        readingTimeDays: this.getReadingTimeInDays(
          readingStarted,
          readingFinished
        ),
      };
    });
  }
}

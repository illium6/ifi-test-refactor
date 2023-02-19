import { AbstractSourceWrapper } from '../models/abstract-source-wrapper';
import { UnifiedBook } from '../interfaces/unified-book';

export class FirstSourceWrapper extends AbstractSourceWrapper {
  public transform(books: any[]): UnifiedBook[] {
    return books.map((book: any) => {
      const authors: string[] = book.authors || [book.author];
      const pagesDone = this.pagesToNumber(book.pages);
      const pagesTotal = this.pagesToNumber(book.total);
      const readingStarted = this.toDate(book.dateOfStart);
      const readingFinished = this.toDate(book.dateOfEnd);

      return {
        title: book.name,
        authors,
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

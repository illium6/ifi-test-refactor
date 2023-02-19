import { AbstractSourceWrapper } from '../models/abstract-source-wrapper';
import { UnifiedBook } from '../interfaces/unified-book';

export class SecondSourceWrapper extends AbstractSourceWrapper {
  public transform(books: any[]): UnifiedBook[] {
    return books.map((book: any) => {
      const readingStarted = this.toDate(book.started || book.dateOfStart);
      const readingFinished = this.toDate(book.finished);

      return {
        title: book.name,
        authors: this.convertArrayLikeToArray(book.authors),
        pagesTotal: book.pagesTotal,
        pagesDone: book.pagesDone,
        readingStarted,
        readingFinished,
        status: this.getStatus(book.pagesDone, book.pagesTotal),
        readingTimeDays: this.getReadingTimeInDays(
          readingStarted,
          readingFinished
        ),
      };
    });
  }
}

import { AbstractSourceWrapper } from '../models/abstract-source-wrapper';
import { UnifiedBook } from '../interfaces/unified-book';

export class SecondSourceWrapper extends AbstractSourceWrapper {
  public transform(books: any[]): UnifiedBook[] {
    return books.map((book: any) => {
      return {
        title: book.name,
        authors: this.convertArrayLikeToArray(book.authors),
        pagesTotal: book.pagesTotal,
        pagesDone: book.pagesDone,
        readingStarted: this.toDate(book.started),
        readingFinished: this.toDate(book.finished),
      };
    });
  }
}

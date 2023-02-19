import { UnifiedBook } from '../interfaces/unified-book';
import { ReadingStatus } from './reading-status';

interface ArrayLike<T> {
  [key: number]: T;
  length: number;
}

export abstract class AbstractSourceWrapper {
  public abstract transform(books: any[]): UnifiedBook[];

  protected convertArrayLikeToArray<T>(arrayLikeObj: ArrayLike<T>): T[] {
    return Array.from(arrayLikeObj);
  }

  protected pagesToNumber(page: string | number): number {
    return typeof page === 'string' ? parseInt(page) : page;
  }

  protected toDate(value: string | number | null): Date | null {
    if (value == null) {
      return value;
    }

    if (value === 0) {
      return null;
    }

    return new Date(value);
  }

  protected getStatus(pagesDone: number, pagesTotal: number): ReadingStatus {
    if (pagesDone === 0) {
      return ReadingStatus.WILL_READ;
    }

    if (pagesDone === pagesTotal) {
      return ReadingStatus.READ;
    }

    return ReadingStatus.READING;
  }

  protected getReadingTimeInDays(
    readingStart: Date | null,
    readingFinish: Date | null
  ): number {
    if (!readingStart) {
      return 0;
    }

    const finishedDate: Date = readingFinish ?? new Date();
    const readingDays: number =
      (finishedDate.getTime() - readingStart.getTime()) / (1000 * 3600 * 24);

    return Math.ceil(readingDays);
  }
}

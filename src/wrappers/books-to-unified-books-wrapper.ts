/*
* Вариант реализации враппера №2
* Он мне нравится сильно меньше фабрики в силу своей "божественности".
* */

import { UnifiedBook } from '../interfaces/unified-book';
import { ReadingStatus } from '../models/reading-status';

interface ArrayLike<T> {
  [key: number]: T;
  length: number;
}

const titleNames = ['name', 'title'] as const;
type TitleNames = (typeof titleNames)[number];

const authorNames = ['author', 'authors'] as const;
type AuthorNames = (typeof authorNames)[number];

const startDateNames = ['dateOfStart', 'started'] as const;
type StartDateNames = (typeof startDateNames)[number];

const finishDateNames = ['dateOfEnd', 'finished'] as const;
type FinishDateNames = (typeof finishDateNames)[number];

const pagesDoneNames = ['pagesDone', 'pages'] as const;
type PagesDoneNames = (typeof pagesDoneNames)[number];

const pagesTotalNames = ['totalPages', 'total'] as const;
type PagesTotalNames = (typeof pagesTotalNames)[number];

type Book = {
  [k in TitleNames]?: string;
} & {
  [k in AuthorNames]?: string | string[] | ArrayLike<string>;
} & {
  [k in StartDateNames]?: string | number | null;
} & {
  [k in FinishDateNames]?: string | number | null;
} & {
  [k in PagesDoneNames]?: string | number;
} & {
  [k in PagesTotalNames]?: string | number;
};

const pagesMap: Map<
  keyof UnifiedBook,
  typeof pagesDoneNames | typeof pagesTotalNames
> = new Map<keyof UnifiedBook, typeof pagesDoneNames | typeof pagesTotalNames>([
  ['pagesDone', pagesDoneNames],
  ['pagesTotal', pagesTotalNames],
]);

const datesMap: Map<
  keyof UnifiedBook,
  typeof startDateNames | typeof finishDateNames
> = new Map<keyof UnifiedBook, typeof startDateNames | typeof finishDateNames>([
  ['readingStarted', startDateNames],
  ['readingFinished', finishDateNames],
]);

export class BooksToUnifiedBooksWrapper {
  public convert(books: Book[]): UnifiedBook[] {
    return books.map((book: Book) => {
      const pagesDone: number = this.getPages(book, 'pagesDone');
      const pagesTotal: number = this.getPages(book, 'pagesTotal');
      const readingStarted: Date | null = this.getDates(book, 'readingStarted');
      const readingFinished: Date | null = this.getDates(
        book,
        'readingFinished'
      );

      return {
        title: this.getTitle(book),
        authors: this.getAuthors(book),
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

  private getTitle(book: Book): string {
    // @ts-ignore
    const titles: string[] = titleNames
      .map((name: TitleNames) => book[name])
      .filter(Boolean);

    if (titles.length === 0) {
      this.throwNotFoundError('title');
    }

    return titles[0];
  }

  private getAuthors(book: Book): string[] {
    // @ts-ignore
    const authors: string[] = authorNames
      .map((name) => {
        const value = book[name];

        if (!value) {
          return null;
        }

        if (typeof value === 'string') {
          return [value];
        }

        if (Array.isArray(value)) {
          return value;
        }

        return Array.from(value);
      })
      .filter(Boolean)
      .flat();

    if (authors.length === 0) {
      this.throwNotFoundError('authors');
    }

    return authors;
  }

  private getPages(book: Book, pagesType: keyof UnifiedBook): number {
    const pagesNames = pagesMap.get(pagesType)!;

    // @ts-ignore
    const pages: number[] = pagesNames
      .map((pages) => {
        const value = book[pages];

        if (value == null) {
          return null;
        }

        return this.pagesToNumber(value);
      })
      .filter((value) => value != null);

    if (pages.length === 0) {
      this.throwNotFoundError(pagesType);
    }

    return pages[0];
  }

  private getDates(book: Book, dateType: keyof UnifiedBook): Date | null {
    const dateNames = datesMap.get(dateType)!;

    // @ts-ignore
    const dates: Array<Date | null> = dateNames
      .map((dateName) => {
        const value = book[dateName];

        if (value === undefined) {
          return value;
        }

        return this.toDate(value);
      })
      .filter((date) => date !== undefined);

    if (dates.length === 0) {
      this.throwNotFoundError(dateType);
    }

    return dates[0];
  }

  private pagesToNumber(page: string | number): number {
    return typeof page === 'string' ? parseInt(page) : page;
  }

  private toDate(value: string | number | null): Date | null {
    if (value == null) {
      return value;
    }

    if (value === 0) {
      return null;
    }

    return new Date(value);
  }

  private getStatus(pagesDone: number, pagesTotal: number): ReadingStatus {
    if (pagesDone === 0) {
      return ReadingStatus.WILL_READ;
    }

    if (pagesDone === pagesTotal) {
      return ReadingStatus.READ;
    }

    return ReadingStatus.READING;
  }

  private getReadingTimeInDays(
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

  private throwNotFoundError(prop: keyof UnifiedBook): void {
    throw new Error(`Не найдено свойство ${prop}`);
  }
}

import { UnifiedBook } from '../interfaces/unified-book';
import { AbstractSourceWrapper } from '../models/abstract-source-wrapper';
import { FirstSourceWrapper } from '../wrappers/first-source-wrapper';
import { SecondSourceWrapper } from '../wrappers/second-source-wrapper';
import { ThirdSourceWrapper } from '../wrappers/third-source-wrapper';

export enum SourceName {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}

export class BooksFactoryService {
  private static bookWrappers: Map<SourceName, AbstractSourceWrapper> = new Map<
    SourceName,
    AbstractSourceWrapper
  >([
    [SourceName.FIRST, new FirstSourceWrapper()],
    [SourceName.SECOND, new SecondSourceWrapper()],
    [SourceName.THIRD, new ThirdSourceWrapper()],
  ]);

  public static create(source: SourceName, books: any[]): UnifiedBook[] {
    if (!this.bookWrappers.has(source)) {
      throw new Error('Не задан враппер для источника данных');
    }

    const wrapper = this.bookWrappers.get(source);

    return wrapper!.transform(books);
  }
}

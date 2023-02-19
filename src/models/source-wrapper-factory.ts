import { AbstractSourceWrapper } from './abstract-source-wrapper';
import { FirstSourceWrapper } from '../wrappers/first-source-wrapper';
import { SecondSourceWrapper } from '../wrappers/second-source-wrapper';
import { ThirdSourceWrapper } from '../wrappers/third-source-wrapper';

export enum SourceName {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}

type FactoryFn = () => AbstractSourceWrapper;

export class SourceWrapperFactory {
  private static bookWrappers: Map<SourceName, FactoryFn> = new Map<
    SourceName,
    FactoryFn
  >([
    [SourceName.FIRST, () => new FirstSourceWrapper()],
    [SourceName.SECOND, () => new SecondSourceWrapper()],
    [SourceName.THIRD, () => new ThirdSourceWrapper()],
  ]);

  public static create(source: SourceName): AbstractSourceWrapper {
    const createFn = this.bookWrappers.get(source);

    if (!createFn) {
      throw new Error('Не задан враппер для источника данных');
    }

    return createFn();
  }
}

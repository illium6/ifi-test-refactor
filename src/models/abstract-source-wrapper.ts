import { UnifiedBook } from '../interfaces/unified-book';

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

    return new Date(value);
  }
}

import {AbstractSourceWrapper} from "../models/abstract-source-wrapper";
import {UnifiedBook} from "../interfaces/unified-book";

export class ThirdSourceWrapper extends AbstractSourceWrapper {
  public transform(books: any[]): UnifiedBook[] {
    return [];
  }
}

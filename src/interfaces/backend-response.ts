import { SourceName } from '../models/source-wrapper-factory';

export interface BackendResponse {
  type: SourceName;
  books: any[];
}

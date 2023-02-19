import { ReadingStatus } from '../models/reading-status';

export interface UnifiedBook {
  title: string;
  authors: string[];
  pagesDone: number;
  pagesTotal: number;
  readingStarted: Date | null;
  readingFinished: Date | null;
  status: ReadingStatus;
  readingTimeDays: number;
}

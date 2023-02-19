import { BooksToUnifiedBooksWrapper } from './books-to-unified-books-wrapper';
import { UnifiedBook } from '../interfaces/unified-book';
import { ReadingStatus } from '../models/reading-status';

describe('BooksWrapper', () => {
  const wrapper: BooksToUnifiedBooksWrapper = new BooksToUnifiedBooksWrapper();

  it('should convert to unified books', () => {
    const converted: UnifiedBook[] = wrapper.convert(bookStub);

    expect(converted.length).toBe(3);
    expect(converted).toEqual([
      {
        title: 'Гарри Поттер и Кубок Огня',
        authors: ['Джоан Роулинг'],
        status: ReadingStatus.READ,
        readingStarted: new Date('2021-06-01 00:00:00'),
        readingFinished: new Date('2021-07-01 00:00:00'),
        pagesDone: 100,
        pagesTotal: 100,
        readingTimeDays: 30,
      },
      {
        title: 'WebAssembly в действии',
        authors: ['Жерар Галлан'],
        status: ReadingStatus.WILL_READ,
        readingStarted: null,
        readingFinished: null,
        pagesDone: 0,
        pagesTotal: 0,
        readingTimeDays: 0,
      },
      {
        title: 'Паразит - царь природы',
        authors: ['Карл Циммер'],
        status: ReadingStatus.READ,
        readingStarted: new Date(1657756800000),
        readingFinished: new Date(1658620800000),
        pagesDone: 446,
        pagesTotal: 446,
        readingTimeDays: 10,
      },
    ]);
  });

  it('should calculate reading status', () => {
    expect((wrapper as any).getStatus(0, 0)).toBe(ReadingStatus.WILL_READ);
    expect((wrapper as any).getStatus(1, 20)).toBe(ReadingStatus.READING);
    expect((wrapper as any).getStatus(2, 0)).toBe(ReadingStatus.READING);
    expect((wrapper as any).getStatus(3, 0)).toBe(ReadingStatus.READING);
    expect((wrapper as any).getStatus(4, 4)).toBe(ReadingStatus.READ);
  });

  it('should calculate reading time in days', () => {
    expect((wrapper as any).getReadingTimeInDays(null, null)).toBe(0);
    expect((wrapper as any).getReadingTimeInDays(new Date(), null)).toBe(0);

    expect(
      (wrapper as any).getReadingTimeInDays(
        new Date('2023-02-18'),
        new Date('2023-02-19')
      )
    ).toBe(1);

    expect(
      (wrapper as any).getReadingTimeInDays(
        new Date('2023-01-19'),
        new Date('2023-02-19')
      )
    ).toBe(31);

    expect(
      (wrapper as any).getReadingTimeInDays(null, new Date('2023-02-19'))
    ).toBe(0);
  });
});

const bookStub = [
  {
    name: 'Гарри Поттер и Кубок Огня',
    author: 'Джоан Роулинг',
    dateOfStart: '2021-06-01 00:00:00',
    dateOfEnd: '2021-07-01 00:00:00',
    pages: '100',
    total: '100',
  },
  {
    name: 'WebAssembly в действии',
    authors: {
      0: 'Жерар Галлан',
      length: 1,
    },
    started: 0,
    finished: 0,
    pagesDone: 0,
    totalPages: 0,
  },
  {
    title: 'Паразит - царь природы',
    authors: ['Карл Циммер'],
    started: 1657756800000,
    finished: 1658620800000,
    pagesDone: 446,
    totalPages: 446,
  },
];

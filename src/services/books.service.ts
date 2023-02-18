import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {concat, Observable} from "rxjs";
import {UnifiedBook} from "../interfaces/unified-book";

@Injectable()
export class BooksService {
  public constructor(private http: HttpClient) {
  }

  public getBooks(): Observable<UnifiedBook[]> {
    const books1 = this.http.get('/first-book-source') as Observable<
      UnifiedBook[]
    >;
    const books2 = this.http.get('/second-book-source') as Observable<
      UnifiedBook[]
    >;

    return concat(books1, books2);
  }
}

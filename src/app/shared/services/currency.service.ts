import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  private apiUrl = environment.currencyApiUrl;
  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<{ [key: string]: number }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => {
        return {
          USD: 1,
          UAH: data.usd.uah,
          EUR: data.usd.eur,
          GBP: data.usd.gbp,
          JPY: data.usd.jpy
        };
      })
    );
  }
}

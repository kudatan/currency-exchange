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
        const rates: { [key: string]: number } = { USD: 1 };
        for (const currency in data.usd) {
          rates[currency.toUpperCase()] = data.usd[currency];
        }
        return rates;
      })
    );
  }
}

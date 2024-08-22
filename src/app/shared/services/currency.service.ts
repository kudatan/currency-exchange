import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  private apiUrl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/uah.json';

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<{ usdToUah: number, eurToUah: number }> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => {
        return {
          usdToUah: 1 / data.uah.usd,
          eurToUah: 1 / data.uah.eur
        };
      })
    );
  }
}

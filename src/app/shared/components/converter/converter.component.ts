import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent implements OnInit{
  currencies: string[] = ['UAH', 'USD', 'EUR', 'GBP', 'JPY'];
  currency1: string = 'USD';
  currency2: string = 'UAH';
  amount1: number = 10;
  amount2: number = 0;

  private rates: { [key: string]: number } = {};

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates(): void {
    this.currencyService.getExchangeRates().subscribe(data => {
      this.rates = data;
      this.convertCurrency('fromFirst');
    });
  }

  convertCurrency(direction: string): void {
    const rate1 = this.rates[this.currency1];
    const rate2 = this.rates[this.currency2];

    if (direction === 'fromFirst') {
      this.amount2 = this.calculateConversion(this.amount1, rate1, rate2);
    } else {
      this.amount1 = this.calculateConversion(this.amount2, rate2, rate1);
    }
  }

  private calculateConversion(amount: number, fromRate: number, toRate: number): number {
    return parseFloat((amount * (toRate / fromRate)).toFixed(2));
  }

}

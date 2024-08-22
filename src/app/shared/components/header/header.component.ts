import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  usdToUah: number = 0;
  eurToUah: number = 0;
  currentDate!: string;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.loadExchangeRates();
    this.setCurrentDate();
  }

  loadExchangeRates(): void {
    this.currencyService.getExchangeRates().subscribe(rates => {
      this.usdToUah = rates['UAH'];
      this.eurToUah = rates['EUR'] / rates['USD'] * rates['UAH'];
    });
  }

  setCurrentDate(): void {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    this.currentDate = today.toLocaleDateString('en-UA', options);
  }


}

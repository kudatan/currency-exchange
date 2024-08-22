import { Routes } from '@angular/router';
import {ConverterComponent} from "./shared/components/converter/converter.component";

export const routes: Routes = [
  {path: '', redirectTo: 'converter', pathMatch: 'full'},
  {path: 'converter', component: ConverterComponent},
  { path: '**', redirectTo: 'converter' }
];

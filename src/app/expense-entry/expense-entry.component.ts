import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ExpenseEntryService } from '../expense-entry.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrl: './expense-entry.component.css'
})
export class ExpenseEntryComponent implements OnInit {
  title: string | undefined;
  expenseEntry$: Observable<ExpenseEntry> | undefined;
  expenseEntry: ExpenseEntry = {} as ExpenseEntry;
  selectedId: number | undefined;
  trackByData(index:number, expenses:ExpenseEntry): number { 
    return expenses.id; 
 }

  goToList() {
    this.router.navigate(['/expenses']);
  }
  constructor(private restService: ExpenseEntryService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.title = "Expense Entry";
    this.expenseEntry$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.restService.getExpenseEntry(this.selectedId);
      })
    );

    this.expenseEntry$.subscribe((data) => this.expenseEntry = data);
  }
}

export interface ExpenseEntry {
  id: number;
  item: string;
  amount: number;
  category: string;
  location: string;
  spendOn: Date;
  createdOn: Date;
}

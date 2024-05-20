import { Component } from '@angular/core';
import { ExpenseEntry } from '../expense-entry/expense-entry.component';
import { ExpenseEntryService } from '../expense-entry.service';

@Component({
  selector: 'app-expense-entry-list',
  templateUrl: './expense-entry-list.component.html',
  styleUrl: './expense-entry-list.component.css'
})
export class ExpenseEntryListComponent {
  title: string = "";
  expenseEntries: ExpenseEntry[] = [];
  displayedColumns: string[] = ['item', 'amount', 'category', 'location', 'spendOn'];
  getExpenseItems() {
      this.restService.getExpenseEntries()
      .subscribe( data => this.expenseEntries = data );
   }

  constructor( private restService: ExpenseEntryService) {}
  ngOnInit() {
    this.title = "Expense Entry List";
    this.getExpenseItems();
  }
}

import { Injectable } from '@angular/core';
import { ExpenseEntry } from './expense-entry/expense-entry.component';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ExpenseEntryService {

  constructor(private httpClient: HttpClient) { }
  private expenseRestUrl = 'http://localhost:8000/api/expense';
  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  };

  private httpErrorHandler (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("A client side error occurred: " + error.message);
    } else {
      console.error("An error " + error.status + " happened in the server: " + error.message);
    }

    return throwError("Error occurred. Please try again.");
  }

  getExpenseEntries() : Observable<ExpenseEntry[]> {
    return this.httpClient.get<ExpenseEntry[]>(this.expenseRestUrl, this.httpOptions)
    .pipe(retry(3),catchError(this.httpErrorHandler));
  }

  getExpenseEntry(id: number) : Observable<ExpenseEntry> {
    return this.httpClient.get<ExpenseEntry>(this.expenseRestUrl + "/" + id, this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  addExpenseEntry(expenseEntry: ExpenseEntry): Observable<ExpenseEntry> {
    return this.httpClient.post<ExpenseEntry>(this.expenseRestUrl, expenseEntry, this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler) 
    ); 
  }

  updateExpenseEntry(expenseEntry: ExpenseEntry): Observable<ExpenseEntry> {
    return this.httpClient.put<ExpenseEntry>(this.expenseRestUrl + "/" + expenseEntry.id, expenseEntry, this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  deleteExpenseEntry(expenseEntry: ExpenseEntry | number): Observable<ExpenseEntry> {
    const id = typeof expenseEntry == 'number' ? expenseEntry : expenseEntry.id;
    const url = `${this.expenseRestUrl}/${id}`;
    return this.httpClient.delete<ExpenseEntry>(url, this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }
}

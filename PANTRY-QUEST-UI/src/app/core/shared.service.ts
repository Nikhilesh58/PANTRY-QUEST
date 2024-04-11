import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectedItemsSubject = new BehaviorSubject<any[]>([]);
  selectedItems$ = this.selectedItemsSubject.asObservable();

  constructor() { }

  updateSelectedItems(items: any[]): void {
    this.selectedItemsSubject.next(items);
  }

  getSelectedItems(): any[] {
    return this.selectedItemsSubject.getValue();
  }
}

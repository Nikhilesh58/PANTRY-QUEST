import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../core/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  availableTimeSlots: any[] = [];
  @ViewChild('confirmationModal') confirmationModal: any;


  constructor(private toastr: ToastrService, private _sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve cart items from local storage
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }

    this._sharedService.selectedItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.availableTimeSlots = [
      { date: new Date(), time: '10:00 AM', availability: 5 },
      { date: new Date(), time: '11:00 AM', availability: 0 },
      { date: new Date(), time: '12:00 PM', availability: 3 },
      { date: new Date(), time: '1:00 PM', availability: 2 },
    ];
  }

  reserveSlot(slot: any): void {
    // Add your logic to reserve the selected time slot here
    console.log('Time slot reserved:', slot.date, slot.time);
    localStorage.removeItem('cartItems');
    this.toastr.success('Order Placed Successfully !!');
    this.router.navigate(["/dashboard"]);
  }

  handleConfirmation(): void {
    // Logic when confirmation is accepted
  }

  handleCancellation(): void {
    // Logic when confirmation is cancelled
  }

  removeItem(item: any): void {
    // Remove the selected item from the cartItems array
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      // Update local storage after removing item
      this.toastr.success('Removed Item successfully !!');
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }
  
}

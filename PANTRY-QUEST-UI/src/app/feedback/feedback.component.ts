import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  selectedCategory: string = '';
  feedback: string = '';
  feedbackInvalid: boolean = false;
  dropdownOpen: boolean = false;
  rating = 0;

  categories: string[] = ['Eggs', 'Chicken', 'Milk', 'Pork Beans'];

  constructor(private router: Router, private toastr: ToastrService) {
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  submitFeedback() {
    if (!this.feedback.trim()) {
      this.feedbackInvalid = true;
      return;
    }
    // Add logic to submit feedback
    console.log('Category:', this.selectedCategory);
    console.log('Feedback:', this.feedback);
    // Reset feedback and category after submission
    this.feedback = '';
    this.selectedCategory = '';
    this.feedbackInvalid = false;
    this.rating = 0.1;
    this.toastr.success('Feedback submitted successfully!', 'Success');
  }
}

import { Component } from '@angular/core';

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

  categories: string[] = ['Eggs', 'Chicken', 'Milk', 'Pork Beans'];

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
  }
}

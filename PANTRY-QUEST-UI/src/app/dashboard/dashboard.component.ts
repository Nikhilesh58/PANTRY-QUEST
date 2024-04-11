import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../core/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private _sharedService: SharedService) {
  }
  
  isDropdownVisible: boolean = false;

  selectedCategories: string[] = [];

  filteredMenuSections: any;

  dropdownTimeout: any;

  selectedItems: any;
  maxReached:any;

  categories = [
    { value: 'Veg', label: 'Veg' },
    { value: 'Non-Veg', label: 'Non-Veg' },
    { value: 'Milk Products', label: 'Milk Products' }
  ];

  menuSections = [
    {
      title: 'Section 1',
      description: 'Select any 2 items',
      selectionLimit: 2,
      items: [
        {
          image: '../../assets/images/apples.jpg',
          name: 'Large Honeycrisp Apple - Each',
          calories: '125 calories',
          type: 'Veg',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Apples'],
          quantity: 0
        },
        {
          image: '../../assets/images/tuna.png',
          name: 'StarKist Chunk Light Tuna in Water Can',
          calories: '90 calories',
          type: 'Non-Veg',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Light Tuna', 'Water', 'Vegetable Broth', 'Salt'],
          quantity: 0
        },
        {
          image: '../../assets/images/wholemilk.webp',
          name: 'Whole Milk',
          calories: '150 calories',
          type: 'Milk Products',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Milk', 'Vitamin D3'],
          quantity: 0
        }
      ]
    },
    {
      title: 'Section 2',
      description: 'Select any 3 item',
      selectionLimit: 3,
      items: [
        {
          image: '../../assets/images/porkbeans.jpg',
          name: "Van Camp's® Pork and Beans in Tomato Sauce",
          calories: '130 calories',
          type: 'Non-Veg',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Prepared White Beans', 'Water', 'Tomato Puree', 'Sugar', 'Distilled Vinegar'],
          quantity: 0
        },
        {
          image: '../../assets/images/blackbeans.jpg',
          name: 'Black Beans',
          calories: '110 calories',
          type: 'Veg',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Prepared Black Beans', 'Water', 'Salt', 'Calcium Chloride (Added to Promote Firmness)'],
          quantity: 0
        },
        {
          image: '../../assets/images/reducedfatmilk.webp',
          name: '2% Reduced Fat Milk',
          calories: '120 calories',
          type: 'Milk Products',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Skim Milk', 'Vitamin A Palmitate', 'Vitamin D3'],
          quantity: 0
        }
      ]
    },
    {
      title: 'Section 3',
      description: 'Select any 2 items',
      selectionLimit: 2,
      items: [
        {
          image: '../../assets/images/avocado.png',
          name: 'Large Ripe Avocado',
          calories: '80 calories',
          type: 'Veg',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Avocado'],
          quantity: 0
        },
        {
          image: '../../assets/images/romaineblend.png',
          name: 'Romaine Blend Salad Bag',
          calories: '20 calories',
          type: 'Veg',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Romaine Lettuce', 'Red Cabbage', 'Carrot'],
          quantity: 0
        },
        {
          image: '../../assets/images/cabbage.jpg',
          name: 'Green Cabbage',
          calories: '25 calories per cup',
          type: 'Veg',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Cabbage'],
          quantity: 0
        },
        {
          image: '../../assets/images/eggs.jpg',
          name: 'Grade A Large White Eggs',
          calories: '70 calories per serving',
          type: 'Non-Veg',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Large Egg'],
          quantity: 0
        }
      ]
    },
    {
      title: 'Section 4',
      description: 'Select any 1 item',
      selectionLimit: 1,
      items: [
        {
          image: '../../assets/images/chickensalad.png',
          name: 'Chicken Salad',
          calories: '195 calories',
          type: 'Non-Veg',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Chicken', 'Celery', 'Mayonnaise', 'Salad Dressing'],
          quantity: 0
        },
        {
          image: '../../assets/images/sweetcorn.png',
          name: 'Whole Kernel Sweet Golden Corn',
          calories: '80 calories',
          type: 'Veg',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Corn', 'Water', 'Sugar', 'Salt'],
          quantity: 0
        },
        {
          image: '../../assets/images/reducedfatmilk.webp',
          name: '2% Reduced Fat Milk',
          calories: '120 calories',
          type: 'Milk Products',
          exp: '05-31-2024',
          availability: 10,
          ingredients: ['Skim Milk', 'Vitamin A Palmitate', 'Vitamin D3'],
          quantity: 0
        }
      ]
    }
  ];


  ngOnInit(): void {
    this.filteredMenuSections = this.menuSections;
    this.filteredMenuSections = this.menuSections.map(section => ({
      ...section,
      items: section.items.map(item => ({
        ...item,
        quantity: item.quantity || 0 // Set quantity to 0 if it's falsy
      }))
    }));
  }

  toggleDropdown(visible: boolean): void {
    if (visible) {
      this.isDropdownVisible = true;
      // Clear any existing timeout
      clearTimeout(this.dropdownTimeout);
    } else {
      // Set a timeout to hide the dropdown after 500 milliseconds
      this.dropdownTimeout = setTimeout(() => {
        this.isDropdownVisible = false;
      }, 500);
    }
  }

  // Function to handle category selection
  onCategorySelect(event: any): void {
    const selectedCategory = event.target.value;
    if (event.target.checked) {
      // Add the selected category to the list
      this.selectedCategories.push(selectedCategory);
    } else {
      // Remove the deselected category from the list
      const index = this.selectedCategories.indexOf(selectedCategory);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }

    // Filter menu sections based on selected categories
    if (this.selectedCategories.length > 0) {
      this.filteredMenuSections = this.menuSections.map(section => ({
        ...section,
        items: section.items.filter((item: any) => this.selectedCategories.includes(item.type))
      })).filter(section => section.items.length > 0);
    } else {
      this.filteredMenuSections = this.menuSections;
    }
  }


  incrementQuantity(item: any): void {
    item.quantity++;
    console.log(this.filteredMenuSections,'ss')
  }

  // Function to decrement quantity
  decrementQuantity(item: any): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  countSelectedItems(section: any): number {
    this.menuSections?.forEach((x:any) => {
      x.items?.forEach((y:any) => {
        if (y.quantity > section.selectionLimit) {
          this.maxReached = true;
        }
      })
    })
    return section.items.reduce((total: any, item: any) => total + (item.quantity || 0), 0);
  }

  // Function to add item to cart
  addToCart(): void {
    if (!this.selectedItems) {
      this.selectedItems = [];
    }

    let itemsToAdd = this.filteredMenuSections.reduce((acc: any, section: any) => {
      const selectedItemsInSection = section.items.filter((item: any) => item.quantity > 0);
      return acc.concat(selectedItemsInSection);
    }, []);
    
    this.selectedItems.push(...itemsToAdd);

    // Reset quantity of selected items to 0
    //itemsToAdd.forEach((item: any) => item.quantity = 0);

    console.log(this.selectedItems);

    if (this.selectedItems.length > 0) {
      this._sharedService.updateSelectedItems(this.selectedItems);
      this.toastr.success('Items added to cart successfully!', 'Success');
    }
  }

}

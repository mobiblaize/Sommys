import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-gallery',
  templateUrl: './products-gallery.component.html',
  styleUrls: ['./products-gallery.component.css']
})
export class ProductsGalleryComponent implements OnInit {

  pastries = [
    {name: 'Cake', types: [
      { name: 'Soft sponge Cake', image: 'sponge.jpg'}, 
      { name: 'Red velvet Cake', image: 'RED-VELVET.jpg' }, 
      { name: 'Chocolate Cake', image: 'chocolate.jpg'}, 
      { name: 'Vanilla Cake', image: 'vanilla.jpg'}, 
      { name: 'Fondant Cake', image: 'fondant.jpg'}, 
      { name: 'Butter Cake', image: 'butter.jpg'} 
    ]
  },
    {'name': 'Meat-pie', "types": [{ name: 'Meat-pie', image: 'meatpie.jpg'}] },
    {'name': 'Samosa', "types": [{ name: 'Samosa', image: 'samosa.jpg'}] },
    {'name': 'Puff-puff', "types": [{ name: 'Puff-puff', image: 'puff-puff.jfif'}] },
    {'name': 'Chin-chin', "types": [
      { name: 'Long Chin-chin', image: 'long-chin-chin.jpg'}, 
      { name: 'Short Chin-chin', image: 'short-chin-chin.jpg' }
    ]
  },
    {'name': 'Peanuts', "types": [{ name: 'Peanuts', image: 'peanut-burger-recipe.jpg'}] },
    {'name': 'Sausage', "types": [{ name: 'Sausage', image: 'sausage.jpg'}] },
    {'name': 'Pizza', "types": [{ name: 'Pizza', image: 'pizza.png'}] },
    {'name': 'Butter-cookies', "types": [{ name: 'Butter-cookies', image: 'Butter_Cookies.jpg'}] },
    {'name': 'Bread-pizza', "types": [{ name: 'Bread-pizza', image: 'bread-pizza.jpg'}] },
    {'name': 'Bread', "types": [{ name: 'Bread', image: 'bread.jpg'}] },
    {'name': 'Pop-corn', "types": [{ name: 'Pop-corn', image: 'pop-corn.jpg'}] }
  ]

  constructor(
    private router: Router,
    private titleService: Title,
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle( 'Product Gallery' );
  }

  onSelect(i, j) {
    let product = this.pastries[i].types[j].name.replace(/\s/g, '-');
    this.router.navigate(['/order', product.toLowerCase()]);
  }

  toSection(id) {
    const yOffset = -80; 
    const element = document.getElementById(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
      }

}

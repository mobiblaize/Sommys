import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-products-gallery',
  templateUrl: './products-gallery.component.html',
  styleUrls: ['./products-gallery.component.css']
})
export class ProductsGalleryComponent implements OnInit {

  pastries = [
    {'name': 'Cake', "types": ['Soft sponge', 'Red velvet', 'Chocolate', 'Vanilla', 'Fondant', 'Butter'], 'images': ['sponge.jpg', 'velvet.jpg', 'chocolate.jpg', 'vanilla.jpg', 'fondant.jpg', 'butter.jpg']},
    {'name': 'Meat-pie', "types": [], 'images': ['meatpie.jpg']},
    {'name': 'Samosa', "types": [], 'images': ['samosa.jpg']},
    {'name': 'Puff-puff', "types": [], 'images': ['puff-puff.jfif']},
    {'name': 'Chin-chin', "types": ['Long', 'Short'], 'images': ['long-chin-chin.jpg', 'short-chin-chin.jpg']},
    {'name': 'Peanuts', "types": [], 'images': ['peanut-burger-recipe.jpg']},
    {'name': 'Sausage', "types": [], 'images': ['sausage.jpg']},
    {'name': 'Pizza', "types": [], 'images': ['pizza.png']},
    {'name': 'Butter-cookies', "types": [], 'images': ['Butter_Cookies.jpg']},
    {'name': 'Bread-pizza', "types": [], 'images': ['bread-pizza.jpg']},
    {'name': 'Bread', "types": [], 'images': ['bread.jpg']},
    {'name': 'Pop-corn', "types": [], 'images': ['pop-corn.jpg']},
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSelect(product) {
    this.router.navigate(['/order', product]);
  }

  toSection(id) {
    console.log(id);
    const yOffset = -80; 
    const element = document.getElementById(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
      }

}

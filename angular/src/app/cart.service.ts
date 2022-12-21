import { Injectable } from '@angular/core';
import { Smoothie } from './Smoothie';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Items } from "./Items";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  smoothies: Array<Smoothie>;
  smoothieCart: BehaviorSubject<Array<Smoothie>>;
  itemId;

  constructor() {
    this.items = [];
    this.smoothies = [];
    this.smoothieCart = new BehaviorSubject(this.smoothies);
  }

  addToCart(smooothie: Smoothie) {
    this.items.push(smooothie);
    this.smoothies = this.items;
    this.smoothieCart.next(this.smoothies);
  }

  getItems(): BehaviorSubject<Array<Smoothie>> {
    return this.smoothieCart;
  }

  clearCart() {
    this.smoothies = [];
    this.smoothieCart = new BehaviorSubject(this.smoothies);
    return this.smoothies;
  }

  deleteItem(item: Smoothie) {
    const index: number = this.smoothies.indexOf(item);
    if (index != -1) {
      this.smoothies.splice(index, 1);
      this.smoothieCart.next(this.smoothies);
    }
  }
}
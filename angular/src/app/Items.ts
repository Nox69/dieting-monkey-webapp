import { Smoothie } from "./Smoothie";

export class Items {
  name: string;
  orderCode: string;
  emailId: string;
  items: Smoothie[];
  constructor() {
    this.name = "";
    this.emailId = "";
    this.orderCode = "";
    this.items = [];
  }
}
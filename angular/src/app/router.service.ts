import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class RouterService {
  constructor(private router: Router, private location: Location) {}

  routeToDashboard() {
    this.router.navigate(["dashboard"]);
  }

  routeToLogin() {
    this.router.navigate(["aunthentication"]);
  }

  routeBack() {
    this.location.back();
  }

  routeToListView() {
    this.router.navigate(["dashboard/view/listview"]);
  }

  routeToCheckout() {
    this.router.navigate(["dashboard/checkout"]);
  }
}

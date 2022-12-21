import { Component, OnInit } from "@angular/core";
import { CartService } from "../cart.service";
import { Smoothie } from "../Smoothie";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterService } from "../router.service";
import { FormControl, Validators } from "@angular/forms";

import {
  MatIconRegistry,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material";
import { Items } from "../Items";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  smoothies: Smoothie[];
  items: Items = new Items();
  errMessage: string;

  constructor(
    private cartService: CartService,
    private routerservice: RouterService,
    private authenticationService: AuthenticationService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "delete",
      sanitizer.bypassSecurityTrustResourceUrl("assets/delete.svg")
    );
  }

  ngOnInit() {
    this.cartService.getItems().subscribe((data) => {
      this.smoothies = data;
    });
  }

  deleteItem(smooothie: Smoothie) {
    this.cartService.deleteItem(smooothie);
  }
}
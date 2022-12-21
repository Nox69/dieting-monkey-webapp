import { Component, OnInit, Inject } from "@angular/core";
import { Smoothie } from "../Smoothie";
import { ProductsService } from "../products.service";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "../authentication.service";
import { RouterService } from "../router.service";
import { CartService } from "../cart.service";
import { MatIconRegistry, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface DialogData {
  editSmoothie: Smoothie;
}

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  smoothies: Array<Smoothie>;
  addSmoothie: Smoothie = new Smoothie();
  errMessage: string;
  isAdmin: boolean;
  updateSmoothie: Smoothie = new Smoothie();

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private routeService: RouterService,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "addcart",
      sanitizer.bypassSecurityTrustResourceUrl("assets/addcart.svg")
    );
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/edit.svg'));
    this.isAdmin = this.authenticationService.getUserRole() === "business-owner";
  }

  ngOnInit() {
    if (
      this.authenticationService.getBearerToken() != null &&
      this.authenticationService.getBearerToken() != ""
    ) {
      this.productsService.fetchProductsFromServer();
      this.getProducts();
      console.log(this.isAdmin);
    } else {
      this.routeService.routeToLogin();
    }
  }

  private getProducts() {
    this.productsService.getProducts().subscribe((data) => {
      this.smoothies = data;
      (err) => (this.errMessage = err.message);
    });
  }

  addSmoothies() {
    this.errMessage = "";
    if (this.addSmoothie.smoothieName === "" || this.addSmoothie.smoothiePrice === "" || this.addSmoothie.smoothieIngredients === "") {
      this.errMessage = "Name and Price both are required fields";
    } else {
      this.productsService
        .addProduct(this.addSmoothie)
        .subscribe((data) => (this.addSmoothie = new Smoothie()));
    }
  }

  addToCart(smoothie) {
    this.cartService.addToCart(smoothie);
    window.alert("Your Smoothie has been added to the cart!");
  }

  updateSmoothieDetails(smoothie: Smoothie): void {
    console.log(smoothie);

    this.updateSmoothie = smoothie;

    const dialogRef = this.dialog.open(ProductEdit, {
      width: '1000px',
      data: this.updateSmoothie
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed call get ');
      this.getProducts();

    });
  }

}


@Component({
  selector: "product-edit",
  templateUrl: "./product-edit.html",
  styleUrls: ["./product.component.css"]
})
export class ProductEdit {

  nt = Smoothie;
  constructor(
    public dialogRef: MatDialogRef<ProductEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private productService: ProductsService) {
  }

  onSave() {
    console.log(this.data);
    this.dialogRef.close();
    this.productService.updateSmoothieDetails(this.data).subscribe(
      editNotes => {
        this.dialogRef.close();
      }
    );
  }

}

import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { AuthenticationService } from "../authentication.service";
import { RouterService } from "../router.service";
import { CartService } from "../cart.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  userId: String;
  isAdmin: boolean;
  constructor(
    private authenticationService: AuthenticationService,
    private routerservice: RouterService,
    private cartService: CartService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "nav",
      sanitizer.bypassSecurityTrustResourceUrl("assets/nav.svg")
    );
    iconRegistry.addSvgIcon(
      "logout",
      sanitizer.bypassSecurityTrustResourceUrl("assets/logout.svg")
    );
    iconRegistry.addSvgIcon(
      "not",
      sanitizer.bypassSecurityTrustResourceUrl("assets/not.svg")
    );
    iconRegistry.addSvgIcon(
      "user",
      sanitizer.bypassSecurityTrustResourceUrl("assets/user.svg")
    );
    iconRegistry.addSvgIcon(
      "shop",
      sanitizer.bypassSecurityTrustResourceUrl("assets/shop.svg")
    );
    this.isAdmin = this.authenticationService.getUserRole() === "business-owner";
  }

  ngOnInit() {
    this.userId = this.authenticationService.getUserName();
  }

  logout() {
    this.authenticationService.setBearerToken("");
    this.authenticationService.setUserName("");
    this.authenticationService.setEmailId("");
    this.authenticationService.setUserRole("");
    this.routerservice.routeToLogin();
    this.cartService.clearCart();
    console.log("logging out");
  }
}

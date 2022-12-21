import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./product/product.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AunthenticationComponent } from "./aunthentication/aunthentication.component";
import { CanActivateRouteGuard } from "./can-activate-route-guard.guard";
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "aunthentication",
    pathMatch: "full",
  },
  { path: "aunthentication", component: AunthenticationComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      { path: "smoothies", component: ProductComponent },
      { path: "", redirectTo: "smoothies", pathMatch: "full" },
      { path: "cart", component: CartComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

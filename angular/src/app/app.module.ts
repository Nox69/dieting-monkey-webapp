import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MatTabsModule, MatSidenavModule } from "@angular/material";
import { MatIconModule, MatButtonModule } from "@angular/material";
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";
import { AunthenticationComponent } from "./aunthentication/aunthentication.component";
import { AuthenticationService } from "./authentication.service";
import { RouterService } from "./router.service";
import { CanActivateRouteGuard } from "./can-activate-route-guard.guard";
import { SearchPipe } from "./search-pipe";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { ProductComponent, ProductEdit } from "./product/product.component";
import { TestComComponent } from './test-com/test-com.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AunthenticationComponent,
    SearchPipe,
    ProductComponent,
    TestComComponent,
    CartComponent,
    ProductEdit,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatListModule,
  ],
  entryComponents: [ProductComponent,ProductEdit],
  providers: [AuthenticationService, RouterService, CanActivateRouteGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

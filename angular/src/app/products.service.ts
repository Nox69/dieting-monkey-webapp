import { Injectable } from "@angular/core";
import { Smoothie } from "./Smoothie";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import "rxjs-compat/add/operator/do";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import * as crypto from "crypto-js";
import { DialogData } from './product/product.component';


@Injectable({
  providedIn: "root",
})
export class ProductsService {
  public static CREATEORUPDATE_SMOOTHIE_URL =
    "http://localhost:8085/v1/api/smoothie";
  public static RETRIEVE_SMOOTHIE_URL =
    "http://localhost:8085/v1/api/smoothies";


  smoothies: Array<Smoothie>;
  smoothieSubject: BehaviorSubject<Array<Smoothie>>;
  token: any;
  userId: any;
  crypto = require("crypto-js");

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.smoothies = [];
    this.smoothieSubject = new BehaviorSubject(this.smoothies);
    this.fetchProductsFromServer();
  }

  fetchProductsFromServer() {
    this.smoothies = [];
    this.smoothieSubject = new BehaviorSubject(this.smoothies);
    this.token = this.authenticationService.getBearerToken();
    this.userId = this.authenticationService.getUserName();
    return this.http.get<Array<Smoothie>>(ProductsService.RETRIEVE_SMOOTHIE_URL, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    }).subscribe(smooothie => {
      this.smoothies = smooothie;
      this.smoothieSubject.next(this.smoothies);
    },
      error => { });
  }

  getProducts(): BehaviorSubject<Array<Smoothie>> {
    return this.smoothieSubject;
  }

  addProduct(smoothie: Smoothie): Observable<Smoothie> {
    return this.http.post<Smoothie>(ProductsService.CREATEORUPDATE_SMOOTHIE_URL, smoothie, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).do(addedSmoothie => {
      this.smoothies.push(addedSmoothie);
      this.smoothieSubject.next(this.smoothies);
    });
  }

  getProductsById(name): Smoothie {
    console.log(name);

    const products = this.smoothies.find((vs) => vs.smoothieName === name);

    return Object.assign({}, products);
  }

  updateSmoothieDetails(data: DialogData): Observable<Smoothie> {
    this.token = this.authenticationService.getBearerToken();
    this.smoothies = data['smoothieId'];
    return this.http.put<Smoothie>(ProductsService.CREATEORUPDATE_SMOOTHIE_URL, data, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).do(addedSmoothie => {
      const smoothieUpdated = this.smoothies.find(smoothieFromSmoothies => smoothieFromSmoothies.smoothieId === addedSmoothie.smoothieId);
      Object.assign(smoothieUpdated, addedSmoothie);
      this.smoothieSubject.next(this.smoothies);
    });
  }
}

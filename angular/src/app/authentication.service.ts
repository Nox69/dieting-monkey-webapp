import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Customer } from "./Customer";
import "rxjs-compat/add/operator/map";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public static REGISTER_USER_API_GATEWAY_URL =
    "http://localhost:8084/v1/api/auth/register";
  public static LOGIN_USER_API_GATEWAY_URL =
    "http://localhost:8084/v1/api/auth/login";

  constructor(private httpClient: HttpClient) { }

  registerUser(user: Customer) {
    return this.httpClient.post<Customer>(AuthenticationService.REGISTER_USER_API_GATEWAY_URL, user);
  }

  authenticateUser(data) {
    return this.httpClient.post<Customer>(AuthenticationService.LOGIN_USER_API_GATEWAY_URL, data);
  }

  setBearerToken(token) {
    localStorage.setItem("bearerToken", token);
  }

  getBearerToken() {
    return localStorage.getItem("bearerToken");
  }

  setEmailId(emailId) {
    localStorage.setItem("emailId", emailId);
  }

  getEmailId() {
    return localStorage.getItem("emailId");
  }

  setUserName(userName) {
    localStorage.setItem("loggedInUser", userName);
  }

  getUserName() {
    return localStorage.getItem("loggedInUser");
  }

  setUserRole(role) {
    localStorage.setItem("role", role);
  }

  getUserRole() {
    return localStorage.getItem("role");
  }

}

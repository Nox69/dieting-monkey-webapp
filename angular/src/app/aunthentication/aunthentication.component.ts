import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { Customer } from "../Customer";
import { AuthenticationService } from "../authentication.service";
import { RouterService } from "../router.service";

@Component({
  selector: "app-aunthentication",
  templateUrl: "./aunthentication.component.html",
  styleUrls: ["./aunthentication.component.css"],
})
export class AunthenticationComponent implements OnInit {
  emailId = new FormControl("", [Validators.required]);
  password = new FormControl("", [Validators.required]);
  hideLp = true;
  addUser: Customer = new Customer();
  errMessage: string;
  public submitMessage: string = "";
  public bearerToken: any;

  constructor(
    private authenticationService: AuthenticationService,
    private routerservice: RouterService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "showIc",
      sanitizer.bypassSecurityTrustResourceUrl("assets/show.svg")
    );
    iconRegistry.addSvgIcon(
      "hideIc",
      sanitizer.bypassSecurityTrustResourceUrl("assets/hide.svg")
    );
  }

  ngOnInit() {
    this.authenticationService.setBearerToken("");
    this.authenticationService.setUserName("");
    this.authenticationService.setEmailId("");
    this.authenticationService.setUserRole("");
  }

  createUser() {
    this.errMessage = "";
    if (
      this.addUser.emailId === "" ||
      this.addUser.name === "" ||
      this.addUser.password === "" ||
      this.addUser.rePassword === ""
    ) {
      // add the error message when both fields are empty
      this.errMessage = "Please enter All the Fields";
    } else if (this.addUser.password != this.addUser.rePassword) {
        this.errMessage = "Passwords dont match. Please Enter again!"
    } else {
      this.authenticationService.registerUser(this.addUser).subscribe(
        (res) => {
          this.submitMessage =
            "User created. Login with emailID and password";
        },
        (err) => {
          this.errMessage =
            "Please check your email ID as it might be registered.";
          this.emailId.setValue("");
          this.password.setValue("");
        }
      );
      this.addUser = new Customer();
    }
  }

  loginSubmit() {
    this.submitMessage = "";
    this.errMessage = "";
    const user = {
      emailId: this.emailId.value,
      password: this.password.value,
    };

    this.authenticationService.authenticateUser(user).subscribe(
      (res) => {
        this.bearerToken = res["token"];
        this.authenticationService.setBearerToken(this.bearerToken);
        this.authenticationService.setUserName(res["name"]);
        this.authenticationService.setUserRole(res["role"]);
        this.routerservice.routeToDashboard();
      },
      (err) => {
        this.submitMessage = "Incorrect EmailId or Password, Please RETRY";
        this.emailId.setValue("");
        this.password.setValue("");
      }
    );
  }

  getUserNameInvalidMessage(): string {
    return this.emailId.hasError("required")
      ? "You must enter a value for email."
      : "";
  }
  getPasswordInvalidMessage(): string {
    return this.password.hasError("required")
      ? "You must enter a value for password."
      : "";
  }
}

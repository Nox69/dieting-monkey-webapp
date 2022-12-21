# Dieting Monkey Web Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) and serves as the Frontend for Smoothie Application.
We can register ourselves and login with the credentials in order to Access the Smoothie List.
Only certain email-ids are whitelisted to be part of admin will be shared in email. So use them in order to Create new Smoothies.
If registering as normal user you will get the option to view the smoothies and add it to Cart.

## Running the app with an IDE (i.e. Visual Studio Code with Node and npm installed)

Clone the service to your computer using the command below:
```sh
git clone https://github.com/Nox69/dieting-monkey-app.git
cd dieting-monkey-app
```

Run the build to kickstart the angular application
```sh
ng build
ng serve
```

Navigate to `http://localhost:4200/.` The app will automatically reload if you change any of the source files.

## Running the app withount an IDE (Docker and Node must be installed)

Clone the service to your computer using the command below:
```sh
git clone https://github.com/Nox69/dieting-monkey-app.git
cd dieting-monkey-app
```

Run the build to kickstart the angular application
```sh
ng build --prod
docker build -t dieting-monkey-app .
docker run --name dieting-monkey-app-container -d -p 4200:4200 dieting-monkey-app
```


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
# Disaster Map Reporting Cards

## Overview
Petabencana reporting cards web-app.
<br>
This platform is built using the Angular framework with a few prerequisites. To get started follow the prerequisite and installation steps.

## Prerequisite
* Install NodeJS = 14.x
  * Download it from [here](https://nodejs.org/en/)
* Install NPM

## Installation steps
* Install dependencies
  * `npm install`
* By default, it will be Indonesian deployment and the default deck will be flood, If you want to add a new deployment or deck check code scaffolding for more details.

## Steps to run the App
* Run `npm run start`. This will start a default deployment Indonesian or `dep=cc npm run pre-build-tasks && ng serve` for deployment with code cc on a dev server http://localhost:4200/
* The default deck that will be served is `flood`.
* To test the deployment locally, open `http://localhost:4200/test123/flood` in the browser.
* To add a new deployment or card deck check the code scaffolding for more details.

## Code scaffolding
### Adding a new deployment
1. Run `export dep='xx'` & `npm run add-deployment` to create the scaffolding for a new deployment.
2. The following files will be added in the specified folders:
- `src/environments/xx`
  - environment.json
  - environment.prod.json
- `deployments/xx/`
  - index.html
  - `/assets`
    - `/icons`
    - `/images`
    - `/locales`
      - en.json
    - `/logos`
  - `/resources`
3. `angular.json` will be modified to add deployment configurations.
4. `package.json` will be modified to add build scripts.
4. The default deck that will be served is `flood`.
5. To test the deployment locally, change the deployment variable in `package.json` > `scripts.start`, run `npm start`, and open `http://localhost:4200/test123/flood` in the browser.

### Adding a new deck of cards
1. Run `export deck=sample` & `npm run add-deck` to create a route to a new cards deck.
2. This will add a new folder, `sample` in `src/app/routes/decks`, including the following:
- sample-routing.module.ts
- sample.component.html
- sample.component.scss
- sample.component.spec.ts
- sample.component.ts
- sample.module.ts
3. Add a new object to the list of "decks" in `src/environments/$dep/environment.json` for the respective deployments, with the following structure:
```json
{
  "decks": [
    "name": "sample",
    "cards": [
      "location"
    ]
  ]
}
```
4. To test the deck locally, change the deployment variable in `package.json` > `scripts.start` to $dep for which the environment file was modified in Step 3, run `npm start`, and open `http://localhost:4200/test123/sample`.

### Adding new cards
1. Run `export card=card_name` & `npm run add-card` to create a route to a new card.
2. Add `card_name` to the list of 'cards' in `src/environments/$dep/environment.json` for the desired deck object, eg.
```json
{
  "decks": [
    "name": "flood",
    "cards": [
      "card_name"
    ]
  ]
}
```
3. To test the card locally, change the deployment variable in `package.json` > `scripts.start` to $dep for which the environment file was modified in Step 2, run `npm start`, and open `http://localhost:4200/test123/flood/card_name`.

## Build
* To generate a production build
  *  Run `ng build`
  *  The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Troubleshooting Guide
* If you had trouble while adding a new deployment or new deck through the commands which is given above in the code scaffolding guide. You need to create the folders and add them to the files manually.

## Testing
* **Unit test**
    * Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
* **End to End test**
    * Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Changes since Fork
Since our fork in November 2017, we've transformed this platform into a comprehensive data exchange solution with numerous improvements:

### User Experience & Reporting Capabilities
- **Streamlined Reporting System**: Implemented fully functional reporting workflows
- **Interactive Content**: Added support for diverse decks and cards to improve information presentation
- **Differentiated Reporting**: Created specialized flows for partner and standard reports
- **Geographic Expansion**: Scaled coverage from city-level to national-level scope
- **Multi-disaster Support**: Enabled reporting across various disaster types simultaneously
- **Crowdsourced Logistics**: Integrated crowdlogistics reporting capabilities
- **Alert System**: Implemented disaster notification subscription features

### Technical Advancements
- **Modern Mapping**: Upgraded from Leaflet to MapboxGLJS for enhanced visualization
- **Improved Interactivity**: Redesigned map interactions for better user experience
- **Performance Optimization**: Enhanced system to handle larger geographic areas efficiently
- **Streamlined Submission**: Optimized the report submission workflow for better usability

These improvements have established the platform as a robust, scalable solution for comprehensive data exchange and management across diverse geographic scales.

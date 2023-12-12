import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { NavigationService } from '../../src/app/services/navigation.service';
import { environment as env } from '../../src/environments/environment';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public route: ActivatedRoute,
    public navController: NavigationService,
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(env.default_language);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('id');

    // Store card routes for navigation
    this.navController.registerCardRoutes('deck');

    // Check for first card, else redirect
    this.navController.checkForFirstCard(this.route);
  }

  ngOnInit() { }

}

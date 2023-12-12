import { Component } from '@angular/core';
import { DeckService } from '../../../services/cards/deck.service';
import { NavigationService } from '../../../services/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank',
  templateUrl: './thank.component.html',
  styleUrls: ['./thank.component.scss'],
})
export class ThankComponent {
  isShowReportAgain = false;
  reportAgainText = '';

  constructor(
    public deckService: DeckService,
    public navController: NavigationService,
    public translateService: TranslateService,
    private router: Router,
  )
  {
    const deckType = this.deckService.getDeckType();
    if (
      deckType === 'earthquake' &&
      this.deckService.finishedSubType.length === 0
    ) {
      this.isShowReportAgain = true;

      switch (this.deckService.getDeckSubType()) {
        case 'road':
          this.reportAgainText = 'card.reportAgainStructure';
          break;
        case 'structure':
          this.reportAgainText = 'card.reportAgainAccess'
          break; 
      }
    } else if(deckType === 'typhoon' ) {
      this.isShowReportAgain = true
      switch(this.deckService.getDeckSubType()) {
        case 'wind':
          this.reportAgainText = 'card.reportAgain'
          break;
        case 'flood':
          this.reportAgainText = 'card.reportAgain'
          break;
        case 'storm':
          this.reportAgainText = 'card.reportAgain'
          break; 
      }
    } else if(deckType === 'volcano' && this.deckService.finishedSubType.length === 0) {
      this.isShowReportAgain = true
      switch(this.deckService.getDeckSubType()) {
        case 'volcanic':
          this.reportAgainText = 'card.reportAgainSmog'
          break;
        case 'smog':
          this.reportAgainText = 'card.reportAgainVolcanic'
          break;
      }
    }
    
    this.deckService.reset();
  }

  get options():{
    opt1:string;
    opt2:string
  } {
    if(this.deckService.getDeckSubType() === 'wind') {
      return {
        opt1 : `card.floodoptbutton`,
        opt2 : `card.stormoptbutton`
      }
    } else if(this.deckService.getDeckSubType() === 'storm'){
      return {
        opt1 : `card.windoptbutton`,
        opt2 : `card.floodoptbutton`
      }
    } else if(this.deckService.getDeckSubType() === 'flood'){
      return {
        opt1 : `card.stormoptbutton`,
        opt2 : `card.windoptbutton`
      }
    }
  }

  get typeImage(): string {
    switch (this.deckService.getDeckSubType()) {
      case 'fire':
        return '../../../assets/decks/fire/thanks/SuccessFireReport.png';
      case 'haze':
        return '../../../assets/decks/fire/thanks/SuccessHazeReport.png';
      case 'flood':
        return '../../../assets/decks/flood/thanks/SuccessFloodReport.svg';
      case 'storm':
        return '../../../../assets/decks/wind/thank/success_wind.png';
      case 'road':
        return '../../../../assets/decks/earthquake/thanks/AddAccessReportIcon_Success.png';
      case 'structure':
        return '../../../../assets/decks/earthquake/thanks/AddStructureFailureIcon_Success.png';

      case 'wind':
        return '../../../../assets/decks/wind/thank/success_wind.png';

      case 'volcanic': return '../../../../assets/decks/volcano/thank/volcano_success.png'
      case 'smog': return '../../../../assets/decks/volcano/thank/ashfall_success.svg'
      case 'storm': return '../../../../assets/decks/wind/thank/success_wind.png'
    }
  }

  get reportUrlText(): string {
    const reportType = this.deckService.getReportType();
    return `card.thank.url.${reportType}`;
  }

  get reportSuccessText(): {
    result: string;
    title: string;
    subTitle: string;
  } {
    const reportType = this.deckService.getReportType();
    return {
      result: `card.thank.result.${reportType}`,
      title: `card.thank.title.${reportType}.0`,
      subTitle: `card.thank.title.${reportType}.1`,
    };
  }


  reportAnotherCard() {
    let newDeckSubType:any
    this.deckService.initiateAnotherReport().then((response)=>{
      if(this.deckService.getDeckType() === 'earthquake'){
        newDeckSubType = this.deckService.getDeckSubType() === 'road' ? 'structure' : 'road';
        this.deckService.setDeckSubType(newDeckSubType);
        let currentRoute1 = this.navController.filterRoutes(newDeckSubType);
        this.router.navigate([response, 'earthquake', currentRoute1[1]]).then(() => {
          this.navController.resetEqDeckToLocation(this.deckService.getRoute());
        }).catch((error) => {
          this.router.navigate(['/error']);
        });      
      } else if(this.deckService.getDeckType() === 'volcano'){
        newDeckSubType = this.deckService.getDeckSubType() === 'volcanic' ? 'smog' : 'volcanic';
        this.deckService.setDeckSubType(newDeckSubType);
        let currentRoute = this.navController.filterRoutes(newDeckSubType);
        this.router.navigate([response, 'volcano', currentRoute[1]]).then(() => {
          this.navController.resetEqDeckToLocation(this.deckService.getRoute());
        }).catch((error) => {
          this.router.navigate(['/error']);
        });
      } else {
          this.navController.reset(this.deckService.getRoute());
      }
    }).catch((error)=>{
      this.router.navigate(['/error']);
    });
  }

  reportTyphoonCard(buttonText: string) {
    console.log('btntext',buttonText)
    this.deckService.setSubSubmission();
    let newDeckSubType: any;
    this.deckService.initiateAnotherReport().then((response)=> {
      if(this.deckService.getDeckType() === 'typhoon'){
        if(buttonText === 'card.windoptbutton'){
          newDeckSubType = 'wind'
        } else if (buttonText === 'card.floodoptbutton'){
          newDeckSubType = 'flood'
        } else if (buttonText === 'card.stormoptbutton'){
          newDeckSubType = 'storm'
        }
        this.deckService.setDeckSubType(newDeckSubType);
        let currentRoute = this.navController.filterRoutes(newDeckSubType);
        this.router.navigate([response, 'typhoon', currentRoute[1]]).then(() => {
          this.navController.resetTyDeckToLocation(this.deckService.getRoute());
        }).catch((error) => {
          this.router.navigate(['/error']);
        });
      }  else {
        this.navController.reset(this.deckService.getRoute());
    }
    })
 
  }

  // reportAnotherCard() {
  //   this.deckService.setSubSubmission();
  //   let newDeckSubType:any
  //     if(this.deckService.getDeckType() === 'earthquake'){
  //       newDeckSubType = this.deckService.getDeckSubType() === 'road' ? 'structure' : 'road';
  //       this.deckService.setDeckSubType(newDeckSubType);
  //       this.navController.filterRoutes(newDeckSubType);
  //       this.navController.resetEqDeckToLocation(this.deckService.getRoute());
  //   }else{
  //     this.navController.reset(this.deckService.getRoute());
  //   }

  // //   // console.log('deckType',this.deckService.getDeckType());
  // //   // console.log('deckSubType',this.deckService.getDeckSubType());
  // }
}
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

import { DeckService } from '../../services/cards/deck.service'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-report-review',
  templateUrl: './report-review.component.html',
  styleUrls: ['./report-review.component.scss']
})
export class ReportReviewComponent implements OnInit, AfterViewChecked {

  previewImg: HTMLImageElement
  previewImgContainer: HTMLDivElement

  constructor(
    public deckService: DeckService,
    private cdRef: ChangeDetectorRef,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    this.initPreviewImg()
  }

  ngAfterViewChecked() {
    if (this.deckService.getDeckSubType() === 'haze') this.initHazeReview()
    this.cdRef.detectChanges()
  }

  initPreviewImg() {
    this.previewImg = document.getElementById('preview-img') as HTMLImageElement
    this.previewImgContainer = document.getElementById('preview-img-container') as HTMLDivElement

    if (this.deckService.getPreview()) {
      this.setImagePreview(this.deckService.getPreview())
    } else {
      let previewImgSrc
      switch (this.deckService.getDeckSubType()) {
        case 'fire': previewImgSrc = '../../../assets/decks/fire/review/Fire.png'; break;
        case 'volcanic': previewImgSrc = '../../../assets/decks/volcano/review/volcano.png'; break;
        case 'smog': previewImgSrc = [
          "../../../../assets/decks/volcano/impact/low1.jpg",
          "../../../../assets/decks/volcano/impact/medium2.jpeg",
          "../../../../assets/decks/volcano/impact/high3.jpg",
        ][this.deckService.getImpact()]; break;
        case 'storm': previewImgSrc = [
          "../../../../assets/decks/typhoon/impact/low.png",
          "../../../../assets/decks/typhoon/impact/medium.png",
          "../../../../assets/decks/typhoon/impact/high.png",
        ][this.deckService.getImpact()]; break;
        case 'flood': previewImgSrc = '../../../assets/decks/flood/review/flood_card_ph.svg'; break;
        case 'haze': previewImgSrc = [
          "../../../../assets/decks/fire/visibility/Visibility_High.jpg",
          "../../../../assets/decks/fire/visibility/Visibility_Medium.jpg",
          "../../../../assets/decks/fire/visibility/Visibility_Low.jpg",
        ][this.deckService.getVisibility()]; break;
        case 'wind': previewImgSrc = [
          "../../../../assets/decks/wind/impact/Graphic_Cracking.png",
          "../../../../assets/decks/wind/impact/MediumDisruption.png",
          "../../../../assets/decks/wind/impact/Graphic_TotalCollapse.png",
        ][this.deckService.getImpact()]; break;
        case 'structure': previewImgSrc = [
          "../../../../assets/decks/earthquake/structure/StructureFailure_1.png",
          "../../../../assets/decks/earthquake/structure/StructureFailure_2.png",
          "../../../../assets/decks/earthquake/structure/StructureFailure_3.png",
          "../../../../assets/decks/earthquake/structure/StructureFailure_4.png",
        ][this.deckService.getStructureFailure()]; break;
        case 'road': previewImgSrc = [
          "../../../../assets/decks/earthquake/condition/RoadCondition_1.png",
          "../../../../assets/decks/earthquake/condition/RoadCondition_2.png",
          "../../../../assets/decks/earthquake/condition/RoadCondition_3.png",
        ][this.deckService.getCondition()]; break;
        default: previewImgSrc = 'https://via.placeholder.com/150'; break;
      }
      this.previewImg.setAttribute('src', previewImgSrc)
      if (this.deckService.getDeckType() === 'volcano') {
        this.previewImgContainer.style.padding = '10px 0'
        this.previewImgContainer.style.justifyContent = 'center'
      }
    }
  }

  initHazeReview() {
    const visibilityImg = document.getElementById('visibility') as HTMLImageElement
    const airqualityImg = document.getElementById('airquality') as HTMLImageElement
    const airqualityText = document.getElementById('airquality-text') as HTMLParagraphElement

    let visibilityImgSrc = '../../../assets/decks/fire/review/visibility/Visibility_Indicator'
    let airqualityImgSrc = '../../../assets/decks/fire/review/airquality/Air_Quality_Indicator'
    let airqualityTextColor = 'white';

    switch (this.deckService.getVisibility()) {
      case 0: visibilityImgSrc += '_Low.png'; break;
      case 1: visibilityImgSrc += '_Medium.png'; break;
      case 2: visibilityImgSrc += '_High.png'; break;
    }

    const airQuality = this.deckService.getAirQuality()
    switch (airQuality) {
      case 1: airqualityImgSrc += '_Moderate.png'; airqualityTextColor = 'yellow'; break;
      case 2: airqualityImgSrc += '_Poor.png'; airqualityTextColor = 'orange'; break;
      case 3: airqualityImgSrc += '_Severe.png'; airqualityTextColor = 'red' ;break;
      case 4: airqualityImgSrc += '_Hazardous.png'; airqualityTextColor = 'red'; break;
    }

    visibilityImg.setAttribute('src', visibilityImgSrc)
    if (airQuality > 0) {
      airqualityImg.setAttribute('src', airqualityImgSrc)
      airqualityText.style.color = airqualityTextColor
    }
  }

  setImagePreview(file: File) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.previewImg.setAttribute('src', e.target.result)
    }
    reader.readAsDataURL(file)
  }

  get description() {
    return this.deckService.getDescription()
  }

  get deckType() {
    return this.deckService.getDeckSubType()
  }

  // Fire

  get fireRange() {
    let radius;
    switch(this.deckService.getDeckType()) {
      case 'fire':
        radius = this.deckService.getFireDistance();
        break;
      case 'volcano':
        radius = this.deckService.getSmogRadius();
        break;
    }
    const range = Math.PI * Math.pow(radius, 2) / 10000

    if (range < 1) return '<1'
    return range.toFixed(2)
  }

  get fireRangeUnit() {
    return this.translate.instant('card.radiusestimate.unit');
  }

  get floodDepth() {
    return this.deckService.getFloodDepth();
  }

  get floodColor() {
    const depth = this.deckService.getFloodDepth()

    if (depth <= 70) {
      return '#FFFB4E';
    } else if (depth <= 150) {
      return '#FB8334';
    } else if (depth > 150) {
      return '#C83047';
    }
  }

  // Haze

  get airQuality() {
    const quality = this.deckService.getAirQuality()
    return this.translate.instant('card.airquality.review.'+quality)
  }

  get visibility() {
    const visibleValue = this.deckService.getVisibility()
    return this.translate.instant('card.visibility.review.'+visibleValue)
  }

  // Road
  get accessibility() {
    return this.deckService.getAccessibility()
  }

  get accessibilityHint() {
    const accessibility = this.deckService.getAccessibility()
    return this.translate.instant("card.accessibility."+accessibility)
  }

  get accessibilityColor() {
    const accessibility = this.deckService.getAccessibility()

    switch (accessibility) {
      case 0 : return "#BE1E2D"
      case 1 : return "#F7941D"
      case 2 : return "#FFDE17"
      case 3 : return "#FFDE17"
      case 4 : return "#00A651"
    }
  }

  get accessibilityKey() {
    return this.translate.instant("card.review.accessKey");
  }
  get disturbanceKey() {
    return this.translate.instant("card.review.disturbanceKey");
  }
  get floodKey() {
    return this.translate.instant("card.review.floodKey");
  }

  get fireKey() {
    return this.translate.instant("card.review.fireKey");
  }

  get smogKey() {
    return this.translate.instant("card.review.smogKey");
  }

  get airQualityKey() {
    return this.translate.instant("card.review.airQualityKey");
  }

  get impactKey() {
    return this.translate.instant("card.review.impactKey");
  }

  get evacuationKey() {
    return this.translate.instant("card.review.evacuationkey");
  }

  get volcanoKey() {
    return this.translate.instant("card.review.volcanoKey");
  }

  get visibilityKey() {
    return this.translate.instant("card.review.visibilityKey");
  }

  get condition() {
    const condition = this.deckService.getCondition()
    return this.translate.instant("card.condition."+condition+".title");
  }

  get impact() {
    const impact = this.deckService.getImpact();
    if(this.deckService.getDeckSubType()==='smog'){
      return this.translate.instant('card.impact.smog_review.'+impact);
    } else if(this.deckService.getDeckSubType()==='storm'){
      return this.translate.instant('card.impact.storm_review.'+impact);
    } else {
      return this.translate.instant("card.impact.review."+impact);
    }
  }

  get impactColor() {
    const impact = this.deckService.getImpact();
    switch(impact){
      case 0:
      return '#ffde17'
      case 1:
      return '#f7941d'
      case 2:
      return '#be1e2d'
    }
  }


  get peopleKey() {
    return this.translate.instant("card.review.peopleKey")
  }

  get evacuateKey() {
    return this.translate.instant("card.review.evacuateKey")
  }

  // Structure
  get structuralFailureKey() {
    return this.translate.instant("card.review.structureKey")
  }
  get structuralFailure() {
    const failure = this.deckService.getStructureFailure()

    switch(failure) {
      case 0: return this.translate.instant("card.structure.0.title")
      case 1: return this.translate.instant("card.structure.1.title")
      case 2: return this.translate.instant("card.structure.2.title")
      case 3: return this.translate.instant("card.structure.3.title")
    }
  }

  get structuralFailureColor() {
    const failure = this.deckService.getStructureFailure()

    switch(failure) {
      case 0: return '#ffde17'
      case 1: return '#f7941d'
      case 2: return '#ff6417'
      case 3: return '#be1e2d'
    }
  }

  // Volcano
  get volcanicSigns() {
    return this.deckService.getVolcanicSigns().map(sign => {
      return this.translate.instant('card.sign.symptoms.'+sign)
    })
  }

  get evacuationNumber() {
    switch(this.deckService.getEvacuationNumber()) {
      case 1: return '< 5 ' + this.translate.instant("card.review.people")
      case 2: return '5 - 50 ' + this.translate.instant("card.review.people")
      case 3: return '> 50 ' + this.translate.instant("card.review.people")
    }
    return undefined
  }

  get evacuationArea() {
    return this.deckService.getEvacuationArea()
      ? this.translate.instant("card.yes")
      : this.translate.instant("card.no")
  }
}

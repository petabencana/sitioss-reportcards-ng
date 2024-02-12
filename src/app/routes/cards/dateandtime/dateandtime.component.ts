import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeckService } from '../../../services/cards/deck.service';
import { TranslateService } from '@ngx-translate/core';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-dateandtime',
  templateUrl: './dateandtime.component.html',
  styleUrls: ['./dateandtime.component.scss'],
})
export class DateandtimeComponent implements OnInit {
  constructor(
    public deckService: DeckService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.deckService.userCanBack();
    this.deckService.userCanContinue();
    this.openCalendar();
  }
  selectedDate: string;
  selectedTime: string;
  openCalendar() {
    flatpickr('#calendarContainer', {
      inline: true,
      enableTime: true, // Enable time picker
      dateFormat: 'Y-m-d H:i',
      minDate: new Date().toISOString().split('T')[0], // Set min date to today
      maxDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // Set max date to 30 days from today
      onChange: (selectedDates, dateStr, instance) => {
        this.selectedDate = dateStr; // Update selectedDate with the selected date
      },
    });
  }

  selectedHour: string = '00';
  selectedMinute: string = '00';

  incrementHour() {
    let hour = parseInt(this.selectedHour);
    hour = (hour + 1) % 24;
    this.selectedHour = hour.toString().padStart(2, '0');
  }

  decrementHour() {
    let hour = parseInt(this.selectedHour);
    hour = (hour - 1 + 24) % 24;
    this.selectedHour = hour.toString().padStart(2, '0');
  }

  incrementMinute() {
    let minute = parseInt(this.selectedMinute);
    minute = (minute + 1) % 60;
    this.selectedMinute = minute.toString().padStart(2, '0');
  }

  decrementMinute() {
    let minute = parseInt(this.selectedMinute);
    minute = (minute - 1 + 60) % 60;
    this.selectedMinute = minute.toString().padStart(2, '0');
  }
}

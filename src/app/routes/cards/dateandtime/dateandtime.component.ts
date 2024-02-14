import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../../services/cards/deck.service';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-dateandtime',
  templateUrl: './dateandtime.component.html',
  styleUrls: ['./dateandtime.component.scss'],
})
export class DateandtimeComponent implements OnInit {
  selectedDate: string;
  selectedTime: string;

  constructor(public deckService: DeckService) {}

  ngOnInit() {
    this.deckService.userCanBack();
    this.deckService.userCanContinue();
    this.selectedDate = this.deckService.getDonationdate() || '';
    this.selectedTime = this.deckService.getDonationtime() || '';
    this.openCalendar();
    this.openTimePicker();
  }

  openCalendar() {
    flatpickr('#calendar', {
      inline: true,
      defaultDate: this.selectedDate, // Prefill calendar with selected date
      minDate: new Date().toISOString().split('T')[0],
      maxDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      onChange: (selectedDates, dateStr, instance) => {
        this.selectedDate = dateStr;
        this.deckService.setDonationdate(this.selectedDate);
      },
    });
  }

  openTimePicker() {
    flatpickr('#time', {
      inline: true,
      defaultDate: this.selectedTime, // Prefill time picker with selected time
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      onChange: (selectedDates, dateStr, instance) => {
        this.selectedTime = dateStr;
        this.deckService.setDonationtime(this.selectedTime);
      },
    });
  }

  check() {
    console.log(
      this.deckService.getDonationdate(),
      this.deckService.getDonationtime()
    );
  }
}

import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	// tslint:disable-next-line:component-selector
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

  public form: FormGroup;
  public moment: any;
  public isAllDayEvent = true;

  @HostListener('keydown.esc')
  public onEsc() {
    this.onNoClick();
  }

  constructor(private fb: FormBuilder,
    // public dialogRef: MatDialogRef<MediaItemInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.data.event ? this.data.event.title : '', [Validators.required]],
      start: this.data.event ? this.data.event.start : '',
      end: this.data.event ? this.data.event.end : '',
      allDayEvent: this.data.event ? !this.data.event.end : false,
      creator: this.fb.group({
        email: this.data.event ? this.data.event.creator.email : '',
        displayName: this.data.event ? this.data.event.creator.displayName : '',
      }),
      location: this.data.event ? this.data.event.location : '',
      htmlLink: this.data.event ? this.data.event.htmlLink : '',
      description: this.data.event ? this.data.event.description : ''
    });

    if (!this.form.get('end').value) {
      this.isAllDayEvent = true;
    }

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      if (this.form.valid) {
        this.data.event = Object.assign({}, this.data.event, changes);
      }
    });
  }

  openGoogleCalendar(link: string): void {
    window.open(link, '_blank');
  }

  toggleAllDayEvent() {
    this.isAllDayEvent = !this.isAllDayEvent;
  }

  onNoClick() {
    // this.dialogRef.close();
  }

}

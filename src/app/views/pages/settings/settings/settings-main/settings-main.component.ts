import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IApplication } from '../../../../../shared/interfaces/application.interface';

@Component({
	// tslint:disable-next-line:component-selector
  selector: 'settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.scss']
})
export class SettingsMainComponent implements OnInit {

  @Input() application: IApplication;
  @Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      page: this.fb.group({
        name: [this.application.page.name, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
        description: this.application.page.description,
        email: this.application.page.email,
        title: this.application.page.title,
        assignedKeywords: this.application.page.assignedKeywords
      })
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      if (this.form.valid) {
        this.application = Object.assign({}, this.application, changes);
        this.saveApplication.emit(this.application);
      }
    });
  }

}

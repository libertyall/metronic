import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { IApplication } from '../../../../../shared/interfaces/application.interface';

@Component({
	// tslint:disable-next-line:component-selector
  selector: 'settings-social-sign-in',
  templateUrl: './settings-social-sign-in.component.html',
  styleUrls: ['./settings-social-sign-in.component.scss']
})
export class SettingsSocialSignInComponent implements OnInit {

  @Input() application: IApplication;
  @Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      signInProviders: this.initSocialSignInProvider()
    });

    const controls: FormArray[] = this.form.get('signInProviders')['controls'];
    controls.forEach(control => control.controls['title'].disable());

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.application = Object.assign({}, this.application, this.form.getRawValue());
      this.saveApplication.emit(this.application);
    });
  }

  initSocialSignInProvider() {
  	// ToDo: InitSocialSignInProviders
    /* const formArray: FormArray = this.fb.array([]);
    const providers = this.application.signInProviders ? this.application.signInProviders : environment.defaultSignInProviders;
    providers.forEach((provider: {
      title: string,
      isEnabled: boolean
    }) => {
      formArray.push(this.fb.group({
        title: provider.title,
        isEnabled: provider.isEnabled
      }));
    });
    return formArray; */
  }

}

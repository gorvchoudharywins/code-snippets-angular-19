import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HelperService } from './core/services/helper/helper.service';
import { DynamicFormComponentDirective } from './core/directives/dynamic-form-component.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    DynamicFormComponentDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Directive-form';
  dynamicForm!: any;
  configs: any[] = [];

  constructor(private _helper: HelperService, private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({});
    this.configs = this._helper.getRegisterFormConfig();
  }

  submit() {
    if (this.dynamicForm.invalid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }
    console.log(this.dynamicForm.value);
  }
}

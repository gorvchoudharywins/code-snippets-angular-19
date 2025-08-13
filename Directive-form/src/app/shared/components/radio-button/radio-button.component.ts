import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ValidationsService } from '../../../core/services/validations/validations.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-button',
  imports: [RadioButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
})
export class RadioButtonComponent {
  @Input() group!: FormGroup;
  @Input() config!: any;
  options!: any[];

  control: any;
  errorMessage!: string;

  constructor(public validatorService: ValidationsService) {}

  ngOnInit(): void {
    this._initialize();
  }

  ngOnChanges(): void {
    if (this.config) this._initialize();
  }

  _initialize() {
    this.group.addControl(this.config.dataKey, new FormControl(''));
    this.control = this.group.controls[this.config.dataKey];

    let validations = this.validatorService.getValidations(
      this.config.validations
    );
    this.control.setValidators(validations);

    this.options = this.config.options;
  }
}

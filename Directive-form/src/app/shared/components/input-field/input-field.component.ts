import { Component, Input } from '@angular/core';
import { ValidationsService } from '../../../core/services/validations/validations.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-field',
  imports: [CommonModule,ReactiveFormsModule, InputTextModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input() group!: FormGroup;
  @Input() config!: any;

  control: any;
  errorMessage!: string;

  arr: Array<string | number> = [1, '12'];

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
  }
}

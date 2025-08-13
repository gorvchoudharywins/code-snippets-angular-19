import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ValidationsService } from '../../../core/services/validations/validations.service';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-drop-down',
  imports: [CommonModule, SelectModule, ReactiveFormsModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss'
})
export class DropDownComponent {
  @Input() group!: FormGroup;
  @Input() config!: any;
  options!: any[];

  control: any;
  errorMessage!: string;

  constructor(public validatorService: ValidationsService) { }

  ngOnInit(): void {
    this._initialize();
  }

  ngOnChanges(): void {
    if (this.config) this._initialize();
  }

  _initialize() {
    this.group.addControl(this.config.dataKey, new FormControl(''));  //Add Form Control
    this.control = this.group.controls[this.config.dataKey];  //Control get

    let validations = this.validatorService.getValidations(this.config.validations); //Get validations
    this.control.setValidators(validations);  //Set validations

    this.options = this.config.options;  //Dropdown options
  }
}

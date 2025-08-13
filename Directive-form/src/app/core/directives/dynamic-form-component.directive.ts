import {
  Directive,
  EventEmitter,
  inject,
  Input,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { RadioButtonComponent } from '../../shared/components/radio-button/radio-button.component';
import { DropDownComponent } from '../../shared/components/drop-down/drop-down.component';

const DYNAMIC_COMPONENT: Record<string, Type<any>> = {
  inputText: InputFieldComponent,
  radioButton: RadioButtonComponent,
  dropdown: DropDownComponent,
};

@Directive({
  selector: '[DynamicFormComponent]',
  exportAs: 'DynamicFormComponent',
})
export class DynamicFormComponentDirective {
  private _componentCreator = inject(ViewContainerRef);

  @Input() group!: FormGroup;
  @Input() config!: any;
  @Output() onChange = new EventEmitter<any>();

  ngOnChanges(): void {
    if (!this.group || !this.config) return;
    this._componentCreator.clear();

    switch (this.config.controlType) {
      case 'group':
        this.handleGroupControl();
        break;
      case 'formArray':
        this.handleFormArrayControl();
        break;
      case 'control':
      default:
        this.handleSingleControl();
        break;
    }
  }

  // for handling group form controls
  private handleGroupControl() {
    this.group.addControl(this.config.control, new FormGroup({}));
    const formGroup = this.group.controls[this.config.control] as FormGroup;

    this.config.configs.forEach((config: any) => {
      this.renderDynamicComponent(formGroup, config);
    });
  }

  // for handling single form controls
  private handleSingleControl(): void {
    this.renderDynamicComponent(this.group, this.config);
  }

  // for handling form array controls
  private handleFormArrayControl(): void {
    this.group.addControl(this.config.control, new FormArray([]));
    const formArray = this.group.controls[this.config.control] as FormArray;

    if (formArray.length === 0) {
      formArray.push(new FormGroup({}));
    }
    for (let i = 0; i < formArray.length; i++) {
      const item = formArray.at(i) as FormGroup;
      for (const control of this.config.configs || []) {
        this.renderDynamicComponent(item, control);
      }
    }
  }

  // for rendering dynamic components
  private renderDynamicComponent(group: FormGroup, config: any): void {
    const compType = DYNAMIC_COMPONENT[config.type];
    if (!compType) return;
    
    const compRef = this._componentCreator.createComponent(compType);
    const instance = compRef.instance as { group: FormGroup; config: any };
    instance.group = group;
    instance.config = config;
  }

  // for adding form array controls
  addFormArrayControl(): void {
    const formArray = this.group.controls[this.config?.control] as FormArray;
    if (!formArray) return;

    formArray.push(new FormGroup({}));
    this._componentCreator.clear();
    this.handleFormArrayControl();
  }

  // for removing form array controls based on the index
  removeFormArrayControl(index: number): void {
    const formArray = this.group.controls[this.config?.control] as FormArray;
    if (!formArray) return;

    if (index >= 0 && index < formArray.length) {
      formArray.removeAt(index);
      this._componentCreator.clear();
      this.handleFormArrayControl();
    }
  }
}

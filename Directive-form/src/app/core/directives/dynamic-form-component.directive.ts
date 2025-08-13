import {
  Directive,
  EventEmitter,
  inject,
  Input,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { RadioButtonComponent } from '../../shared/components/radio-button/radio-button.component';
import { DropDownComponent } from '../../shared/components/drop-down/drop-down.component';
import { FormGroup, FormArray } from '@angular/forms';

const DYNAMIC_COMPONENT: { [type: string]: Type<any> } = {
  inputText: InputFieldComponent,
  radioButton: RadioButtonComponent,
  dropdown: DropDownComponent,
};

@Directive({
  selector: '[DynamicFormComponent]',
})
export class DynamicFormComponentDirective {
  private _componentCreator = inject(ViewContainerRef);

  @Input() group!: FormGroup;
  @Input() config!: any;
  @Output() onChange = new EventEmitter();
  component!: ReturnType<ViewContainerRef['createComponent']>;

  ngOnChanges(): void {
    if (this.group && this.config.controlType === 'group') {
      this.handleGroupControl();
    } else if (this.group && this.config.controlType === 'formArray') {
      this.handleFormArrayControl();
    } else if (this.group && this.config.controlType === 'control') {
      this.handleSingleControl();
    }
  }
  private handleFormArrayControl() {
    this.group.setControl(this.config.control, new FormArray([]));
    const formArray = this.group.get(this.config.control) as FormArray;

    if (formArray.length === 0) {
      const group = new FormGroup({});
      this.config.configs.forEach((config: any) => {
        const componentType = DYNAMIC_COMPONENT[config.type];
        if (componentType) {
          this.createAndInitComponent(componentType, group, config);
        }
      });
      formArray.push(group);
    }
  }

  private handleGroupControl() {
    this.group.setControl(this.config.control, new FormGroup({}));
    this.config.configs.forEach((config: any) => {
      const componentType = DYNAMIC_COMPONENT[config.type];
      if (componentType) {
        this.createAndInitComponent(
          componentType,
          this.group.controls[this.config.control] as FormGroup,
          config
        );
      }
    });
  }

  private handleSingleControl() {
    const componentType = DYNAMIC_COMPONENT[this.config?.type];
    if (componentType) {
      this.createAndInitComponent(componentType, this.group, this.config);
    }
  }

  private createAndInitComponent(
    componentType: Type<any>,
    group: FormGroup,
    config: any
  ) {
    this.component = this._componentCreator.createComponent(componentType);
    const instance = this.component.instance as {
      group: FormGroup;
      config: any;
    };
    instance.group = group;
    instance.config = config;
  }
}

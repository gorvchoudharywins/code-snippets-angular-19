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
import { FormGroup } from '@angular/forms';

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
  component!: any;

  ngOnChanges(): void {
    this.initializeComponent();
  }

  private initializeComponent() {
    if (this.group && this.config.controlType === 'group') {
      this.group.setControl(this.config.control, new FormGroup({}));
      this.config.configs.forEach((config: any) => {
        const componentType = DYNAMIC_COMPONENT[config.type];
        if (componentType) {
          this.component = this._componentCreator.createComponent(componentType);
          this.component.instance.group =
            this.group.controls[this.config.control];
          this.component.instance.config = config;
        }
      });
    } else if (this.group && this.config.controlType === 'control') {
      const componentType = DYNAMIC_COMPONENT[this.config?.type];
      if (componentType) {
        this.component = this._componentCreator.createComponent(componentType);
        this.component.instance.group = this.group;
        this.component.instance.config = this.config;
      }
    }
  }
}

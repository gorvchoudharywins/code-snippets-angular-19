import { Directive, EventEmitter, Input, Output, Type, ViewContainerRef } from '@angular/core';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { RadioButtonComponent } from '../../shared/components/radio-button/radio-button.component';
import { DropDownComponent } from '../../shared/components/drop-down/drop-down.component';
import { FormGroup } from '@angular/forms';

// interface configType {
//   group: FormGroup,
//   config: any
// }

const DYNAMIC_COMPONENT: { [type: string]: Type<any> } = {
  inputText: InputFieldComponent,
  radioButton: RadioButtonComponent,
  dropdown: DropDownComponent
}

@Directive({
  selector: '[DynamicFormComponent]'
})
export class DynamicFormComponentDirective {
  @Input() group!: Type<FormGroup>;
  @Input() config!: any;
  @Output() onChange = new EventEmitter();
  component!: any;

  constructor(private componentCreator: ViewContainerRef) { }

  ngOnChanges(): void {
    // debugger
    // if (this.component) {
    //   this.initializeComponent();
    //   return;
    // }
    this.createComponent();
  }

  createComponent(): void {
    this.component = this.componentCreator.createComponent(DYNAMIC_COMPONENT[this.config.type]);
    this.initializeComponent();
  }

  initializeComponent() {
    this.component.instance.group = this.group;
    this.component.instance.config = this.config;
  }
}

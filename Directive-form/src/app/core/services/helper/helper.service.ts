import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  getRegisterFormConfig() {
    return [
      {
        heading: 'Personal information',
        control: 'personalInformartion',
        controlType: 'group',
        configs: [
          {
            dataKey: 'firstname',
            label: 'Firstname',
            type: 'inputText',
            validations: { required: true },
          },
          {
            dataKey: 'lastname',
            label: 'Lastname',
            type: 'inputText',
            validations: { required: true },
          },
        ],
      },
      {
        heading: 'Local information',
        control: 'localInformartion',
        controlType: 'group',
        configs: [
          {
            dataKey: 'firstname',
            label: 'Firstname',
            type: 'inputText',
            validations: { required: true },
          },
          {
            dataKey: 'lastname',
            label: 'Lastname',
            type: 'inputText',
            validations: { required: true },
          },
        ],
      },
      {
        controlType: 'control',
        dataKey: 'test',
        label: 'Test',
        type: 'inputText',
        validations: { required: true },
      },
     {
        heading: 'Form Array',
        control: 'formArray',
        controlType: 'formArray',
        configs: [
          {
            dataKey: 'first',
            label: 'First',
            type: 'inputText',
            validations: { required: true },
          },
          {
            dataKey: 'last',
            label: 'Last',
            type: 'inputText',
            validations: { required: true },
          },
        ],
      },
    ];
  }

  getdynamicFormConfig() {
    return [
      {
        dataKey: 'Username',
        label: 'Username',
        type: 'inputText',
        validations: { required: true },
      },
      {
        dataKey: 'city',
        label: 'City',
        type: 'dropdown',
        placeholder: `Choose a City`,
        validations: { required: true },
        options: [
          { name: 'Chandigarh', code: 'ch' },
          { name: 'Panchkula', code: 'pk' },
          { name: 'Zirkpur', code: 'zk' },
        ],
      },
      {
        dataKey: 'ageConfirm',
        label: 'Age 18+',
        type: 'radioButton',
        validations: { required: true },
        options: [
          { name: 'Yes', key: 'y' },
          { name: 'No', key: 'n' },
        ],
      },
    ];
  }
}

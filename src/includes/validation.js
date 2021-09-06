import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';

import {
  required, min, max, alpha_spaces as alphaSpaces, email,
  min_value as minValue, max_value as maxValue, numeric,
  confirmed, not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('numeric', numeric);
    defineRule('passwords_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    configure({
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
      generateMessage: (context) => {
        const messages = {
          required: `The field ${context.field} is required`,
          min: `The field ${context.field} is to short`,
          max: `The field ${context.field} is to long`,
          alpha_spaces: `The field ${context.field} must only contains alphabetical chars`,
          email: `The field ${context.field} must be valid email`,
          min_value: `The field ${context.field} is to low`,
          max_value: `The field ${context.field} is to high`,
          excluded: `You are not allowed to use this value for the field ${context.field}`,
          country_excluded: 'Due to the restrictions, we do not accept users from this location',
          passwords_mismatch: 'The passwords don`t march',
          tos: 'You must accept the Terms of Service',
        };

        return messages[context.rule.name] ? messages[context.rule.name]
          : `The field ${context.field} is invalid`;
      },
    });
  },
};

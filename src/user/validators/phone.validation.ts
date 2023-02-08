import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidNumber } from 'libphonenumber-js';

@ValidatorConstraint()
export class PhoneValidation implements ValidatorConstraintInterface {
  validate(value: any): Promise<boolean> | boolean {
    return typeof value === 'string' && isValidNumber(value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} is not valid.`;
  }
}
export function IsPhone(options?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      constraints: [],
      validator: PhoneValidation,
    });
  };
}

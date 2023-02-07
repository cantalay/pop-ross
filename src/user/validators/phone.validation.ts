import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PhoneNumberUtil } from 'google-libphonenumber';
export class PhoneValidation implements ValidatorConstraintInterface {
  validate(value: any): Promise<boolean> | boolean {
    return (
      typeof value === 'string' &&
      PhoneNumberUtil.getInstance().isValidNumber(value)
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} is not valid phone number.`;
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

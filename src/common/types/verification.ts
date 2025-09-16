export enum EverifationsTypes {
  REGISTER = 'register',
  EMAIL_PASSWORD = 'reset_email',
  EDIT_PHONE = 'edit_phone',
}

export interface ICheckOtp {
  type: EverifationsTypes;
  gmail: string;
  otp: string;
}

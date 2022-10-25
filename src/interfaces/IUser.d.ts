export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
  surname: string;
  confirmPassword?: string;
  phone: string;
}

export interface IUserInfo extends IRegister {
  user_id: string;
  balance: number;
}

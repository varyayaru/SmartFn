export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type UserState =
  | { status: 'guest' }
  | { status: 'fetching' }
  | ({
      status: 'logged';
    } & Omit<UserType, 'password'>);

export type InitialUserType = {
  accessToken: string;
  userData: UserState;
};

export type AuthSignUpType = Omit<UserType, 'id'>;
export type AuthSignInType = Omit<UserType, 'id' | 'username'>;

export type AuthResponseType = {
  accessToken: string;
  user: Omit<UserType, 'password'>;
};

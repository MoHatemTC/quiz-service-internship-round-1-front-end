export type UserRole = 'STUDENT' | 'ADMIN';

export type User = {
  id: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
};

export type LoginResponse = {
  user: User;
  tokens: {
    accessToken: string;
    tokenType: string;
    expiresIn: string;
  };
};

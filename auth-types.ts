import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

export interface CustomJWT extends JWT {
  id: string;
  email: string;
}

export interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
  };
}

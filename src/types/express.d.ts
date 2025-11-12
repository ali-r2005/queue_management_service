import { MyUserPayload } from './jwt';

declare global {
  namespace Express {
    export interface Request {
      user?: MyUserPayload;
    }
  }
}

export {};
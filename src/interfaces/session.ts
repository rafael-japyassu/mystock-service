import User from '../models/User'

export interface ISessionRequest {
  email: string;
  password: string;
}

export interface ISessionResponse {
  user: User;
  token: string;
}

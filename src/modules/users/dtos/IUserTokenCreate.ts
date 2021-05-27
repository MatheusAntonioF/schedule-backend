export interface IUserTokenCreate {
  refresh_token: string;
  expires_in: Date;
  user_id: string;
}

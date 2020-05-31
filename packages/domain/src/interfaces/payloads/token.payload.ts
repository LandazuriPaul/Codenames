export interface TokenPayload {
  accessToken: string;
  tokenType: 'bearer';
  expiresIn?: string | number;
  refreshToken?: string;
}

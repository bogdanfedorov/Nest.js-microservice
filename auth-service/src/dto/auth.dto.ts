export class RegisterDto {
  username: string;
  password: string;
}

export class LoginDto {
  username: string;
  password: string;
}

export class TokenPayload {
  username: string;
  sub: string;
  role: string;
}

export enum TokenVereficationStatus {
  Confirmed,
  Rejected,
}

export enum AuthCommands {
  Register,
  Login,
  Verefication,
}

import { PossibleRoles } from './PossibleRoles';

export class AuthState {
  isLoggedIn: boolean = false;
  role?: PossibleRoles;
  username?: string;
  email?: string;
}

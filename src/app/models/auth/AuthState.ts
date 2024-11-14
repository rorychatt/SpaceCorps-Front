import { PossibleRoles } from './PossibleRoles';
import { PlayerData } from '../player/PlayerData';

export class AuthState {
  isLoggedIn: boolean = false;
  role?: PossibleRoles;
  username?: string;
  email?: string;
  playerData?: PlayerData;
}

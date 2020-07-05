import { Codename } from './codename.interface';

export interface Board {
  height: number;
  width: number;
  codenames: Codename[];
}

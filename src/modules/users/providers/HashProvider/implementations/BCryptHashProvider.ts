import { hash, compare } from 'bcryptjs';

import { IHashProvider } from '../interfaces/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { BCryptHashProvider };

import { hash, compare } from 'bcryptjs';

export class PasswordHasher {
  private static readonly saltRounds = 8;

  static async hashPassword(password: string): Promise<string> {
    return await hash(password, this.saltRounds);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}

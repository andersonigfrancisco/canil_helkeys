import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthSchema = z.infer<typeof authSchema>;

export class AuthDto implements AuthSchema {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'john@example.com'
  })
  email!: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456'
  })
  password!: string;

  constructor(partial: Partial<AuthDto>) {
    Object.assign(this, partial);
  }
} 
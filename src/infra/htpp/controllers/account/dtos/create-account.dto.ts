import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;

export class CreateAccountDto implements CreateAccountSchema {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe'
  })
  name!: string;

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

  @ApiProperty({
    description: 'Papel do usuário no sistema',
    example: 'USER',
    default: 'USER'
  })
  role!: string;

  constructor(partial: Partial<CreateAccountDto>) {
    Object.assign(this, partial);
  }
} 
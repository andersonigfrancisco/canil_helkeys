import { User } from '@/domain/users/enterprise/entities/user'

export type UserOutput = {
  id:string;
  name:string;
  email:string;
  role:string;
  password:string;
  createdAt:Date;
  updatedAt:Date | null | undefined;
}

export class UserOutputMapper {
  static toOutput(entity: User): UserOutput {
    return {
      id: entity.id.toString(),
      email: entity.email,
      name: entity.name,
      role: entity.role as any,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}

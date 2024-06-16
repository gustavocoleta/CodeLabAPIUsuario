import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class EnviarEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  to: string | string[];

  @IsNotEmpty()
  @IsDefined()
  subject: string;

  @IsNotEmpty()
  @IsDefined()
  context: any;

  @IsNotEmpty()
  @IsDefined()
  template: string;
}

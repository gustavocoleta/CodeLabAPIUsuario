import { IsEmail, IsNotEmpty } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';

export class LoginDto {
  @IsEmail({}, { message: `email ${EMensagem.NaoValido}` })
  @IsNotEmpty({ message: `email ${EMensagem.NaoPodeSerVazio}` })
  email: string;

  @IsNotEmpty({ message: `email ${EMensagem.NaoPodeSerVazio}` })
  senha: string;
}

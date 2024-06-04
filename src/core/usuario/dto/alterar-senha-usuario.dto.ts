import { IsEmail, IsNotEmpty } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';

export class AlterarSenhaUsuarioDto {
  @IsNotEmpty({ message: `email ${EMensagem.NaoPodeSerVazio}` })
  @IsEmail({}, { message: `email ${EMensagem.NaoValido}` })
  email: string;

  @IsNotEmpty({ message: `senha ${EMensagem.NaoPodeSerVazio}` })
  senha: string;

  @IsNotEmpty({ message: `token ${EMensagem.NaoPodeSerVazio}` })
  token: string;
}

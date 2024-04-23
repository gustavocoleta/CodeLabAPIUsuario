import { IsEmail, IsEmpty, IsNotEmpty, MaxLength } from 'class-validator';
import { EMensagem } from 'src/shared/enums/mensagem.enum';

export class CreateUsuarioDto {
  @IsEmpty({ message: `ID ${EMensagem.DeveSerVazio}` })
  id: number;

  @IsNotEmpty({ message: `nome ${EMensagem.NaoPodeSerVazio}` })
  @MaxLength(60, { message: `nome ${EMensagem.MaisCaracteresQuePermitido}` })
  nome: string;

  @IsNotEmpty({ message: `email ${EMensagem.NaoPodeSerVazio}` })
  @IsEmail({}, { message: `email ${EMensagem.NaoValido}` })
  email: string;

  @IsNotEmpty({ message: `senha ${EMensagem.NaoPodeSerVazio}` })
  senha: string;

  @IsNotEmpty({ message: `ativo ${EMensagem.NaoPodeSerVazio}` })
  ativo: boolean;

  @IsNotEmpty({ message: `admin ${EMensagem.NaoPodeSerVazio}` })
  admin: boolean;
}

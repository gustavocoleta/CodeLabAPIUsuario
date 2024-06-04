import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';
import { CreateUsuarioPermissaoDto } from './create-usuario-permissao.dto';
import { UpdateUsuarioPermissaoDto } from './update-usuario-permissao.dto';

export class CreateUsuarioDto {
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

  @IsArray({ message: `permissao ${EMensagem.TipoInvalido}` })
  @Type(() => CreateUsuarioPermissaoDto)
  permissao: CreateUsuarioPermissaoDto[] | UpdateUsuarioPermissaoDto[];
}

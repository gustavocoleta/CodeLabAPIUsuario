import { IsInt, IsNotEmpty } from 'class-validator';
import { EMensagem } from '../../../shared/enums/mensagem.enum';

export class CreateUsuarioPermissaoDto {
  @IsNotEmpty({ message: `modulo ${EMensagem.NaoPodeSerVazio}` })
  @IsInt()
  modulo: number;
}

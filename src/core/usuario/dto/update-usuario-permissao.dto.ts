import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioPermissaoDto } from './create-usuario-permissao.dto';

export class UpdateUsuarioPermissaoDto extends PartialType(
  CreateUsuarioPermissaoDto,
) {}

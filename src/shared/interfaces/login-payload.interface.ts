import { UsuarioPermissao } from '../../core/usuario/entities/usuario-permissao.entity';

export interface ILoginPayload {
  id: number;
  nome: string;
  email: string;
  admin: boolean;
  permissao: UsuarioPermissao[];
}

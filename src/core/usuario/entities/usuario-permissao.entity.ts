import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('usuariopermissao')
export class UsuarioPermissao {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_usuariopermissao' })
  id: number;

  @Column({ nullable: false })
  idUsuario: number;

  @Column({ nullable: false })
  modulo: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({
    name: 'idUsuario',
    foreignKeyConstraintName: 'fk_permissao_usuario',
  })
  usuario: Usuario;
}

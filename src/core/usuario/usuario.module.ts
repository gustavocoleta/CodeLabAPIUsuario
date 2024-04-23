import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPermissao } from './entities/usuario-permissao.entity';
import { Usuario } from './entities/usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, UsuarioPermissao])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}

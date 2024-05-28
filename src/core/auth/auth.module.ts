import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPermissao } from '../usuario/entities/usuario-permissao.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, UsuarioPermissao])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

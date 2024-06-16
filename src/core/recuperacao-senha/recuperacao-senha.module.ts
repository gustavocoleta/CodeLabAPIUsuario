import { Module } from '@nestjs/common';
import { ClientProxy, Closeable } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmqClientService } from '../../shared/services/rqm-client.service';
import { UsuarioPermissao } from '../usuario/entities/usuario-permissao.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { RecuperacaoSenha } from './entities/recuperacao-senha.entity';
import { RecuperacaoSenhaController } from './recuperacao-senha.controller';
import { RecuperacaoSenhaService } from './recuperacao-senha.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecuperacaoSenha, Usuario, UsuarioPermissao]),
  ],
  controllers: [RecuperacaoSenhaController],
  providers: [
    RecuperacaoSenhaService,
    {
      provide: 'MAIL_SERVICE',
      useFactory: async (
        rmqClientService: RmqClientService,
      ): Promise<ClientProxy & Closeable> => {
        return rmqClientService.createRabbitMQOptions('mail.enviar-email');
      },
      inject: [RmqClientService],
    },
    RmqClientService,
  ],
})
export class RecuperacaoSenhaModule {}

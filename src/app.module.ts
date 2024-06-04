import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { AuthModule } from './core/auth/auth.module';
import { RecuperacaoSenhaModule } from './core/recuperacao-senha/recuperacao-senha.module';
import { UsuarioModule } from './core/usuario/usuario.module';
import { RequestLoggerMiddleware } from './shared/middlewares/request-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`,
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    RecuperacaoSenhaModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

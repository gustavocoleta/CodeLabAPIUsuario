import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Closeable,
} from '@nestjs/microservices';
import { rmqConfig } from '../../config/queue/rmq.config';

@Injectable()
export class RmqClientService {
  constructor(private configService: ConfigService) {}

  async createRabbitMQOptions(queue: string): Promise<ClientProxy & Closeable> {
    return Promise.resolve(
      ClientProxyFactory.create({
        ...rmqConfig(this.configService, queue),
      }),
    );
  }
}
